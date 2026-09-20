from __future__ import annotations

from copy import deepcopy
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path
import json

CARD_FIELDS = (
    "tracked_player_yellows",
    "tracked_player_dismissals",
    "opponent_player_yellows",
    "opponent_player_dismissals",
)
FOUL_FIELDS = ("tracked_fouls", "opponent_fouls")
CLAIM_FIELDS = FOUL_FIELDS + CARD_FIELDS


class ValidationError(ValueError):
    pass


def load_json(path: str | Path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def dump_json(data, path: str | Path):
    p = Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def round_1(value: float) -> float:
    return float(Decimal(str(value)).quantize(Decimal("0.1"), rounding=ROUND_HALF_UP))


def ratio(numerator: int, denominator: int):
    if denominator == 0:
        return None
    return round_1(numerator / denominator)


def card_totals(events: list[dict]) -> dict:
    out = {
        "tracked_player_yellows": 0,
        "tracked_player_dismissals": 0,
        "opponent_player_yellows": 0,
        "opponent_player_dismissals": 0,
        "tracked_staff_yellows": 0,
        "tracked_staff_dismissals": 0,
        "opponent_staff_yellows": 0,
        "opponent_staff_dismissals": 0,
    }
    for event in events:
        side = event["side"]
        subject_type = event["subject_type"]
        card = event["card"]
        if side not in {"tracked", "opponent"}:
            raise ValidationError(f"Invalid card side: {side}")
        if subject_type not in {"player", "staff"}:
            raise ValidationError(f"Invalid subject_type: {subject_type}")
        if card not in {"yellow", "red", "second_yellow_red"}:
            raise ValidationError(f"Invalid card type: {card}")

        prefix = f"{side}_{subject_type}_"
        if card in {"yellow", "second_yellow_red"}:
            out[prefix + "yellows"] += 1
        if card in {"red", "second_yellow_red"}:
            out[prefix + "dismissals"] += 1
    return out


def _resolved_claims(match: dict) -> dict:
    cards = card_totals(match.get("cards", []))
    return {
        "tracked_fouls": match["resolved"]["tracked_fouls"],
        "opponent_fouls": match["resolved"]["opponent_fouls"],
        **{k: cards[k] for k in CARD_FIELDS},
    }


def _conflict_for(match: dict, field: str):
    for conflict in match.get("conflicts", []):
        if conflict.get("field") == field:
            return conflict
    return None


def validate_discipline_match(match: dict, config: dict) -> list[str]:
    errors = []
    required = [
        "match_id", "comparison_game_number", "played_at", "tracked_club",
        "opponent", "status", "verification_status", "resolved", "cards", "sources"
    ]
    for key in required:
        if key not in match:
            errors.append(f"{match.get('match_id','<unknown>')}: missing {key}")
    if errors:
        return errors

    if match["status"] != "completed":
        return errors

    if match["tracked_club"] not in config["tracked_clubs"]:
        errors.append(f"{match['match_id']}: untracked club {match['tracked_club']}")

    try:
        resolved = _resolved_claims(match)
    except Exception as exc:
        errors.append(f"{match['match_id']}: card/resolved parse failed: {exc}")
        return errors

    if any(not isinstance(resolved[f], int) or resolved[f] < 0 for f in FOUL_FIELDS):
        errors.append(f"{match['match_id']}: foul totals must be non-negative integers")

    min_sources = int(config["discipline"]["minimum_independent_sources"])
    source_groups = {s.get("independence_group") for s in match["sources"] if s.get("independence_group")}
    if match["verification_status"] == "verified" and len(source_groups) < min_sources:
        errors.append(
            f"{match['match_id']}: verified match needs at least {min_sources} independent source groups"
        )

    if match["verification_status"] == "verified":
        for field in CLAIM_FIELDS:
            claims = []
            for source in match["sources"]:
                if field in source.get("claims", {}):
                    claims.append((source.get("id"), source.get("independence_group"), source["claims"][field]))
            distinct_groups = {group for _, group, _ in claims if group}
            values = {value for _, _, value in claims}

            if len(distinct_groups) < min_sources:
                errors.append(f"{match['match_id']}: {field} has fewer than {min_sources} independent claims")
                continue

            if len(values) == 1:
                only = next(iter(values))
                if only != resolved[field]:
                    errors.append(
                        f"{match['match_id']}: {field} resolved={resolved[field]} but sources agree on {only}"
                    )
            else:
                conflict = _conflict_for(match, field)
                if not conflict:
                    errors.append(f"{match['match_id']}: undocumented source conflict for {field}: {sorted(values)}")
                    continue
                if conflict.get("status") != "resolved":
                    errors.append(f"{match['match_id']}: unresolved source conflict for {field}")
                if conflict.get("chosen_value") != resolved[field]:
                    errors.append(f"{match['match_id']}: conflict chosen_value mismatch for {field}")
                if not conflict.get("resolution_note"):
                    errors.append(f"{match['match_id']}: source conflict for {field} lacks resolution_note")

    return errors


def validate_discipline_dataset(dataset: dict, config: dict) -> list[str]:
    errors = []
    seen = set()
    per_club_numbers = {club: set() for club in config["tracked_clubs"]}
    for match in dataset.get("matches", []):
        mid = match.get("match_id")
        if mid in seen:
            errors.append(f"duplicate match_id: {mid}")
        seen.add(mid)
        club = match.get("tracked_club")
        num = match.get("comparison_game_number")
        if club in per_club_numbers and isinstance(num, int):
            if num in per_club_numbers[club]:
                errors.append(f"{club}: duplicate comparison_game_number {num}")
            per_club_numbers[club].add(num)
        errors.extend(validate_discipline_match(match, config))
    return errors


def _blank_side():
    return {"fouls": 0, "player_yellows": 0, "player_dismissals": 0}


def _decorate_side(side: dict, games: int) -> dict:
    out = dict(side)
    out["avg_fouls"] = ratio(out["fouls"], games)
    out["fouls_per_yellow"] = ratio(out["fouls"], out["player_yellows"])
    return out


def build_discipline_snapshot(config: dict, baseline: dict, dataset: dict, target_games: int, as_of: str | None = None):
    errors = validate_discipline_dataset(dataset, config)
    if errors:
        raise ValidationError("\n".join(errors))

    baseline_n = baseline["comparison_game_number"]
    if target_games < baseline_n:
        raise ValidationError("target_games cannot be lower than the imported baseline")

    clubs = deepcopy(baseline["clubs"])
    for club in config["tracked_clubs"]:
        clubs.setdefault(club, {"games": 0, "team": _blank_side(), "opponents": _blank_side()})

    accepted_by_club = {club: [] for club in config["tracked_clubs"]}
    blocking = []

    for match in dataset.get("matches", []):
        if match["status"] != "completed":
            continue
        if match["comparison_game_number"] > target_games:
            continue
        club = match["tracked_club"]
        if match["comparison_game_number"] <= baseline_n:
            blocking.append(f"{match['match_id']}: incremental dataset overlaps baseline")
            continue
        if match["verification_status"] != "verified":
            blocking.append(f"{match['match_id']}: completed but not verified")
            continue
        accepted_by_club[club].append(match)

    for club, matches in accepted_by_club.items():
        matches.sort(key=lambda m: (m["comparison_game_number"], m["played_at"], m["match_id"]))
        expected_numbers = list(range(baseline_n + 1, target_games + 1))
        got_numbers = [m["comparison_game_number"] for m in matches]
        if got_numbers != expected_numbers:
            blocking.append(f"{club}: expected comparison games {expected_numbers}, got {got_numbers}")

        for match in matches:
            cards = card_totals(match["cards"])
            clubs[club]["games"] += 1
            clubs[club]["team"]["fouls"] += match["resolved"]["tracked_fouls"]
            clubs[club]["team"]["player_yellows"] += cards["tracked_player_yellows"]
            clubs[club]["team"]["player_dismissals"] += cards["tracked_player_dismissals"]
            clubs[club]["opponents"]["fouls"] += match["resolved"]["opponent_fouls"]
            clubs[club]["opponents"]["player_yellows"] += cards["opponent_player_yellows"]
            clubs[club]["opponents"]["player_dismissals"] += cards["opponent_player_dismissals"]

    publishable = not blocking and all(clubs[c]["games"] == target_games for c in config["tracked_clubs"])
    decorated = {}
    for club in config["tracked_clubs"]:
        games = clubs[club]["games"]
        decorated[club] = {
            "games": games,
            "team": _decorate_side(clubs[club]["team"], games),
            "opponents": _decorate_side(clubs[club]["opponents"], games),
        }

    return {
        "season": config["season"],
        "comparison_game_number": target_games,
        "as_of": as_of,
        "publishable": publishable,
        "blocking_reasons": blocking,
        "clubs": decorated,
    }


def build_refereeing_snapshot(
    config: dict,
    matches_doc: dict,
    decisions_doc: dict,
    target_games: int,
    as_of: str | None = None,
    pending_doc: dict | None = None,
):
    tracked = set(config["tracked_clubs"])
    relevant_matches = [
        m for m in matches_doc.get("matches", [])
        if m.get("tracked_club") in tracked
        and m.get("status") == "completed"
        and int(m.get("comparison_game_number", 10**9)) <= target_games
    ]
    pending_in_scope = [
        m for m in (pending_doc or {}).get("matches", [])
        if m.get("tracked_club") in tracked
        and int(m.get("comparison_game_number", 10**9)) <= target_games
    ]

    blocking = []
    for match in relevant_matches:
        if match.get("review_status") != "complete":
            blocking.append(f"{match['match_id']}: review_status={match.get('review_status')}")
    for match in pending_in_scope:
        blocking.append(
            f"{match.get('match_id','<unknown>')}: pending review_status={match.get('review_status','pending')}"
        )

    relevant_ids = {m["match_id"] for m in relevant_matches}
    decisions = [d for d in decisions_doc.get("decisions", []) if d.get("match_id") in relevant_ids]
    totals = {club: {"errors_for": 0, "errors_against": 0} for club in config["tracked_clubs"]}

    for decision in decisions:
        status = decision.get("status")
        if status not in {"candidate", "disputed", "confirmed"}:
            blocking.append(f"{decision.get('decision_id','<unknown>')}: invalid decision status {status}")
            continue
        if status != "confirmed":
            continue
        if not decision.get("provenance"):
            blocking.append(f"{decision.get('decision_id','<unknown>')}: confirmed decision lacks provenance")
            continue
        club = decision.get("tracked_club")
        direction = decision.get("direction")
        if club not in totals:
            blocking.append(f"{decision.get('decision_id','<unknown>')}: invalid tracked_club")
            continue
        if direction == "for":
            totals[club]["errors_for"] += 1
        elif direction == "against":
            totals[club]["errors_against"] += 1
        else:
            blocking.append(f"{decision.get('decision_id','<unknown>')}: invalid direction {direction}")

    played_scope = len(relevant_matches) + len(pending_in_scope)
    publishable = not blocking and bool(played_scope)
    return {
        "season": config["season"],
        "comparison_game_number": target_games,
        "as_of": as_of,
        "publishable": publishable,
        "blocking_reasons": blocking,
        "public_totals": totals if publishable else {},
        "reviewed_matches": len([m for m in relevant_matches if m.get("review_status") == "complete"]),
        "played_matches_in_scope": played_scope,
    }
