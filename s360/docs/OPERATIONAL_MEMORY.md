# S360 operational memory — Liga Portugal 2026/27

This file is the persistent operational memory for the S360 Liga Portugal 2026/27 workstream. The repository is the operational source of truth.

## Non-negotiable publishing rules

| Area | Rule | Consequence |
|---|---|---|
| Milestone trigger | Generate a public comparison only when FC Porto, SL Benfica and Sporting CP have all reached the same comparison-game count. | Do not generate after isolated matches. |
| Discipline evidence | Each new match must be verified at match level against at least two genuinely independent source groups for every public metric. | Unverified matches remain provisional. |
| Discipline cards | Separate player cards from staff cards. Public totals use player cards only. | Staff cards stay in audit data, not public totals. |
| Second-yellow dismissal | Count a second-yellow dismissal as both one shown yellow and one player dismissal. | Avoid undercounting yellows or expulsions. |
| Source conflicts | Resolve and document source conflicts before discipline publication. | Undocumented conflicts block publication. |
| Refereeing evidence | Never infer zero errors from missing analysis. | Missing analysis keeps the match in review. |
| Refereeing totals | Only confirmed decisions enter public totals. | Candidate/disputed rows stay excluded. |
| Refereeing publishability | Do not mark a refereeing snapshot publishable until every played tracked match in scope is fully reviewed under the evidence threshold. | The pending-review queue hard-blocks the builder. |
| Club emblems | Always use repository assets from `s360/assets/clubs/`; never recreate club emblems with image AI. | Prevents wrong/fictional logos. |
| Discipline infographic | Use the canonical round-5 layout without redesign. | Only round/date/game count/statistical values change. |

## Canonical club assets

| Club | Canonical asset path | Notes |
|---|---|---|
| FC Porto | `s360/assets/clubs/fc-porto.webp` | White background in the infographic. |
| SL Benfica | `s360/assets/clubs/sl-benfica.webp` | White background in the infographic. |
| Sporting CP | `s360/assets/clubs/sporting-cp.webp` | 2026 Sporting symbol supplied by Martim; preserve aspect ratio and never substitute it. |

## Preferred discipline source families

Flashscore is an approved preferred source from 2026-09-20. It is not sufficient by itself: S360 still requires a second genuinely independent group.

Preferred/accepted families currently include **Flashscore, FotMob, 365Scores, zerozero, OFStats, RTP, Record, ESPN and BeSoccer**. Source independence matters more than publisher count: two sites carrying the same upstream feed must not be treated as independent without evidence.

## Current discipline comparison — publishable milestone 7

As of 2026-09-20, FC Porto, SL Benfica and Sporting CP have each completed seven comparison matches. `discipline/snapshots/007.json` is publishable.

| Club | Games | Club fouls | Club yellows | Club reds | Fouls/game | Fouls/yellow | Opp. fouls | Opp. yellows | Opp. reds | Opp. fouls/game | Opp. fouls/yellow |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| FC Porto | 7 | 96 | 6 | 0 | 13.7 | 16.0 | 69 | 15 | 2 | 9.9 | 4.6 |
| SL Benfica | 7 | 88 | 14 | 1 | 12.6 | 6.3 | 110 | 20 | 1 | 15.7 | 5.5 |
| Sporting CP | 7 | 83 | 18 | 1 | 11.9 | 4.6 | 96 | 18 | 1 | 13.7 | 5.3 |

### Corrected comparison game 6 — Sporting

The earlier 10-foul/3-yellow Sporting feed for Famalicão-Sporting was stale. Current zerozero and OffsideScores match tables show **Famalicão 14–11 Sporting in fouls and 2–4 in player yellows**, and event evidence includes Iván Fresneda's yellow at 90+7. ESPN/BeSoccer's earlier 14–10 / 2–3 snapshot is retained as conflict provenance.

Resolved game-6 Sporting totals:
- Sporting: 11 fouls, 4 player yellows, 0 player dismissals.
- Famalicão: 14 fouls, 2 player yellows, 1 direct-red player dismissal.
- Carlos Carvalhal yellow: staff card, stored for audit and excluded publicly.

This correction changes milestone 6 Sporting from 73 fouls/13 yellows to **74 fouls/14 yellows**.

### Comparison game 7 match-level inputs

| Tracked club | Match | Tracked fouls | Opp. fouls | Tracked player yellows | Opp. player yellows | Tracked dismissals | Opp. dismissals |
|---|---|---:|---:|---:|---:|---:|---:|
| Sporting CP | Sporting 2–2 Arouca | 9 | 17 | 4 | 5 | 1 | 0 |
| FC Porto | FC Porto 3–1 Benfica | 17 | 12 | 3 | 5 | 0 | 1 |
| SL Benfica | FC Porto 3–1 Benfica | 12 | 17 | 5 | 3 | 1 | 0 |

Notes:
- Sporting-Arouca: Debast was a direct red.
- FC Porto-Benfica: Lenglet's 35' dismissal was a second yellow. Under the S360 rule it counts as one shown yellow **and** one Benfica player dismissal.
- No staff cards were located in the verified round-7 public totals.

## Current refereeing state — milestone 7 NOT publishable

`refereeing/snapshots/007.json` is deliberately `publishable: false`.

### Publication blockers

1. Fourteen earlier tracked matches through comparison game 5 still require explicit match-level backfill.
2. FC Porto-Benfica (2026-09-20) has current match evidence, but named expert analysis is not yet conclusive enough for the S360 threshold. Verdade Desportiva currently has the 5' and 35' incidents marked **Em análise**. No zero-error inference is permitted.

### Confirmed decisions already recorded but not public

These are eligible only after the whole refereeing snapshot becomes publishable:

| Match | Minute | Tracked club | Direction | Confirmed error |
|---|---|---|---|---|
| Casa Pia-FC Porto | 45+4 | FC Porto | Against | Kaly foul/yellow not given |
| Benfica-Gil Vicente | 18 | SL Benfica | Against | Gil Martins foul was not disciplined |
| Benfica-Gil Vicente | 67 | SL Benfica | Against | Direct free kick on Pavlidis not awarded |
| Famalicão-Sporting | 7 | Sporting CP | Against | Penalty on Maxi Araújo not awarded |
| Sporting-Arouca | 25 | Sporting CP | Against | Yellow to Espen van Ee not shown |

### Material disputes / candidate rows

- Moreirense-Benfica 44m penalty: **disputed**, excluded.
- Casa Pia-FC Porto 1m penalty claim: **disputed**, excluded.
- Benfica-Gil Vicente 18m: the existence of a disciplinary error is confirmed, but sanction severity is disputed — Pedro Henriques says yellow; José Leirós says red. Count one confirmed error only, without asserting a sanction severity.
- Famalicão-Sporting 33m missed foul/yellow and 59m missed yellow: **candidate**, excluded.
- Sporting-Arouca 28m missed yellow: **candidate**, excluded.
- FC Porto-Benfica 5m/35m: **under analysis**, no verdict and no zero inference.

## Public-facing interpretation guardrails

| Claim type | Safe wording | Avoid |
|---|---|---|
| Small sample | “São apenas 7 jogos; vamos acompanhar a evolução jornada a jornada.” | Presenting causality as proven. |
| Discipline ratios | State totals/ratios and arithmetic comparisons. | Saying discipline data proves refereeing bias. |
| Red cards | “The yellow/foul ratio counts shown yellows only; dismissals are shown separately.” | Mixing reds into yellow/foul ratios. |
| Refereeing incomplete coverage | “Public refereeing totals remain withheld while the review backlog is incomplete.” | Publishing zeroes or partial totals. |

## Workflow

| Step | Data branch | Action | Publishable when |
|---|---|---|---|
| 1 | Discipline | Add match-level fouls, player cards, staff cards, source groups and conflicts. | Match is verified and conflicts are resolved. |
| 2 | Discipline | Rebuild deterministic snapshot for the equalised comparison milestone. | FC Porto, SL Benfica and Sporting CP all have the same comparison-game count. |
| 3 | Discipline | Generate infographic using canonical round-5 layout and repository club assets only. | Snapshot is publishable. |
| 4 | Refereeing | Add every played tracked match to either the reviewed dataset or explicit pending-review queue. | Every match in scope is represented. |
| 5 | Refereeing | Search official/VAR/named referee-analysis sources and record provenance. | Evidence threshold is met for every played tracked match. |
| 6 | Refereeing | Include only confirmed decisions in public totals. | Candidate/disputed decisions remain excluded and documented. |

## Named refereeing source families to search

| Source family | Examples |
|---|---|
| A BOLA | Pedro Henriques |
| Record | Marco Ferreira, Jorge Faustino, Iturralde |
| O JOGO | Jorge Coroado, José Leirós, Fortunato Azevedo |
| Rádio Renascença | VAR Bola Branca |
| Verdade Desportiva | Match-by-match decision aggregation and provenance |
| VSPORTS | Match evidence / video incidents |
| Official material | Liga Portugal, FPF, match sheets, disciplinary records, VAR/official communications where available |
