# S360 — Liga Portugal 2026/27 statistics

This folder is the source of truth for the S360 Liga Portugal panels. It is deliberately separate from the original Ronaldo Counter web app.

Persistent operational memory and tables live in `docs/OPERATIONAL_MEMORY.md`.

## Two independent data branches

- `discipline/`: match-level fouls and cards, plus deterministic cumulative snapshots.
- `refereeing/`: match review queue and decisions (`candidate`, `disputed`, `confirmed`).

Public output must be generated from these files. Do not edit infographic numbers manually.

## Discipline rules

A completed match can enter a public snapshot only when it is `verified` and has at least **two independent source groups** for every public metric. If sources disagree, the conflict must be explicitly recorded and resolved in `conflicts`; an undocumented disagreement blocks publication.

Cards are stored as events with `subject_type = player|staff`. Public card totals use **players only**. `second_yellow_red` counts as **one shown yellow plus one player dismissal**. Staff cards remain stored for audit but never contaminate player totals.

The imported milestone-5 baseline is in `data/season-2026-27/discipline/baseline-005.json`. From comparison game #6 onward, append one tracked-club perspective to `matches.json`; the builder adds those records to the baseline.

## Comparison milestones

S360 publishes a comparison only when FC Porto, SL Benfica and Sporting CP have all reached the same comparison game number. A postponed match therefore does not trigger a new panel merely because another club has already played again. When a catch-up game equalises the sample, the milestone can become publishable.

## Refereeing rules

Every played tracked match must be present in the review queue. A refereeing snapshot is blocked until each match in scope has `review_status = complete`.

Named review families are configured in `config/season-2026-27.json` and include Pedro Henriques/A BOLA; Marco Ferreira, Jorge Faustino and Iturralde/Record; Jorge Coroado, José Leirós and Fortunato Azevedo/O JOGO; Renascença VAR Bola Branca; Verdade Desportiva; and VSPORTS evidence.

Only `confirmed` decisions enter public totals. `candidate` and `disputed` decisions are retained with provenance but excluded. Missing analysis is never interpreted as zero errors.

## Canonical club assets

| Club | Asset path | Usage rule |
|---|---|---|
| FC Porto | `assets/clubs/fc-porto.webp` | Always use the repository crest. |
| SL Benfica | `assets/clubs/sl-benfica.webp` | Always use the repository crest. |
| Sporting CP | `assets/clubs/sporting-cp.webp` | Always use the 2026 symbol supplied by Martim. |

## Commands

```bash
PYTHONPATH=s360/src python -m unittest discover -s s360/tests -v
python s360/scripts/validate.py

# once match #6 is verified for all three clubs:
python s360/scripts/build_discipline_snapshot.py --target-games 6 --as-of YYYY-MM-DD

# refereeing; exits non-zero while review coverage is incomplete:
python s360/scripts/build_refereeing_snapshot.py --target-games 6 --as-of YYYY-MM-DD
```

Exit code `2` from a snapshot builder means the requested milestone is **not publishable**. This is intentional: it prevents a partial panel from being mistaken for a finished one.

## Update checklist

1. Add the match record immediately after the final whistle, but keep it `provisional` until evidence is complete.
2. Record every player/staff card separately.
3. Add at least two independent source checks; do not copy the same upstream feed under two publishers and call it independent.
4. Resolve source conflicts explicitly.
5. Run tests and `validate.py`.
6. Generate a snapshot only when the three clubs reach the same comparison milestone.
7. For refereeing, complete the evidence review queue before publishing; never use silence as evidence of zero errors.
