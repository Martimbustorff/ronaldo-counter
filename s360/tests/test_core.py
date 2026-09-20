import unittest

from s360_stats.core import (
    card_totals,
    build_discipline_snapshot,
    build_refereeing_snapshot,
    validate_discipline_match,
)

CONFIG = {
    "season": "2026-27",
    "tracked_clubs": ["FC Porto", "SL Benfica", "Sporting CP"],
    "discipline": {"minimum_independent_sources": 2},
}


class TestCards(unittest.TestCase):
    def test_staff_excluded_and_second_yellow_semantics(self):
        totals = card_totals([
            {"side": "tracked", "subject_type": "player", "card": "yellow"},
            {"side": "tracked", "subject_type": "player", "card": "second_yellow_red"},
            {"side": "tracked", "subject_type": "staff", "card": "yellow"},
        ])
        self.assertEqual(totals["tracked_player_yellows"], 2)
        self.assertEqual(totals["tracked_player_dismissals"], 1)
        self.assertEqual(totals["tracked_staff_yellows"], 1)


class TestDisciplineValidation(unittest.TestCase):
    def sample_match(self):
        claims = {
            "tracked_fouls": 10,
            "opponent_fouls": 17,
            "tracked_player_yellows": 2,
            "tracked_player_dismissals": 0,
            "opponent_player_yellows": 4,
            "opponent_player_dismissals": 0,
        }
        return {
            "match_id": "x",
            "comparison_game_number": 6,
            "played_at": "2026-09-10",
            "tracked_club": "SL Benfica",
            "opponent": "Moreirense FC",
            "status": "completed",
            "verification_status": "verified",
            "resolved": {"tracked_fouls": 10, "opponent_fouls": 17},
            "cards": [
                {"side": "tracked", "subject_type": "player", "card": "yellow"},
                {"side": "tracked", "subject_type": "player", "card": "yellow"},
                *[{"side": "opponent", "subject_type": "player", "card": "yellow"} for _ in range(4)],
            ],
            "sources": [
                {"id": "a", "independence_group": "a", "claims": dict(claims)},
                {"id": "b", "independence_group": "b", "claims": dict(claims)},
            ],
            "conflicts": [],
        }

    def test_two_independent_sources_required(self):
        m = self.sample_match()
        m["sources"] = m["sources"][:1]
        errors = validate_discipline_match(m, CONFIG)
        self.assertTrue(any("independent" in e for e in errors))

    def test_undocumented_conflict_blocks(self):
        m = self.sample_match()
        m["sources"][1]["claims"]["tracked_fouls"] = 11
        errors = validate_discipline_match(m, CONFIG)
        self.assertTrue(any("undocumented source conflict" in e for e in errors))

    def test_documented_conflict_can_resolve(self):
        m = self.sample_match()
        m["sources"][1]["claims"]["tracked_fouls"] = 11
        m["conflicts"] = [{
            "field": "tracked_fouls",
            "status": "resolved",
            "chosen_value": 10,
            "resolution_note": "Official match report and event log support 10."
        }]
        errors = validate_discipline_match(m, CONFIG)
        self.assertFalse(errors)


class TestSnapshots(unittest.TestCase):
    def test_baseline_metrics(self):
        baseline = {
            "comparison_game_number": 5,
            "clubs": {
                "FC Porto": {
                    "games": 5,
                    "team": {"fouls": 69, "player_yellows": 2, "player_dismissals": 0},
                    "opponents": {"fouls": 44, "player_yellows": 6, "player_dismissals": 1},
                },
                "SL Benfica": {
                    "games": 5,
                    "team": {"fouls": 65, "player_yellows": 7, "player_dismissals": 0},
                    "opponents": {"fouls": 75, "player_yellows": 14, "player_dismissals": 1},
                },
                "Sporting CP": {
                    "games": 5,
                    "team": {"fouls": 63, "player_yellows": 10, "player_dismissals": 0},
                    "opponents": {"fouls": 65, "player_yellows": 11, "player_dismissals": 0},
                },
            }
        }
        snap = build_discipline_snapshot(CONFIG, baseline, {"matches": []}, 5, "2026-09-09")
        self.assertTrue(snap["publishable"])
        self.assertEqual(snap["clubs"]["FC Porto"]["team"]["fouls_per_yellow"], 34.5)
        self.assertEqual(snap["clubs"]["SL Benfica"]["team"]["avg_fouls"], 13.0)
        self.assertEqual(snap["clubs"]["SL Benfica"]["opponents"]["fouls_per_yellow"], 5.4)

    def test_refereeing_missing_review_blocks_publication(self):
        matches = {"matches": [{
            "match_id": "m1",
            "tracked_club": "SL Benfica",
            "comparison_game_number": 5,
            "status": "completed",
            "review_status": "awaiting_full_expert_review",
        }]}
        snap = build_refereeing_snapshot(CONFIG, matches, {"decisions": []}, 5, "2026-09-09")
        self.assertFalse(snap["publishable"])
        self.assertEqual(snap["public_totals"], {})

    def test_refereeing_pending_queue_blocks_even_when_completed_rows_are_reviewed(self):
        matches = {"matches": [{
            "match_id": "m1",
            "tracked_club": "FC Porto",
            "comparison_game_number": 6,
            "status": "completed",
            "review_status": "complete",
        }]}
        pending = {"matches": [{
            "match_id": "old-backfill",
            "tracked_club": "FC Porto",
            "comparison_game_number": 2,
            "review_status": "pending_backfill",
        }]}
        snap = build_refereeing_snapshot(
            CONFIG, matches, {"decisions": []}, 6, "2026-09-20", pending_doc=pending
        )
        self.assertFalse(snap["publishable"])
        self.assertEqual(snap["public_totals"], {})
        self.assertTrue(any("old-backfill" in reason for reason in snap["blocking_reasons"]))

    def test_refereeing_only_confirmed_counts(self):
        matches = {"matches": [{
            "match_id": "m1",
            "tracked_club": "Sporting CP",
            "comparison_game_number": 6,
            "status": "completed",
            "review_status": "complete",
        }]}
        decisions = {"decisions": [
            {
                "decision_id": "d1",
                "match_id": "m1",
                "tracked_club": "Sporting CP",
                "direction": "for",
                "status": "confirmed",
                "provenance": [{"source_family": "A"}],
            },
            {
                "decision_id": "d2",
                "match_id": "m1",
                "tracked_club": "Sporting CP",
                "direction": "against",
                "status": "candidate",
                "provenance": [{"source_family": "B"}],
            },
            {
                "decision_id": "d3",
                "match_id": "m1",
                "tracked_club": "Sporting CP",
                "direction": "against",
                "status": "disputed",
                "provenance": [{"source_family": "C"}],
            },
        ]}
        snap = build_refereeing_snapshot(CONFIG, matches, decisions, 6, "2026-09-10")
        self.assertTrue(snap["publishable"])
        self.assertEqual(
            snap["public_totals"]["Sporting CP"],
            {"errors_for": 1, "errors_against": 0},
        )


if __name__ == "__main__":
    unittest.main()
