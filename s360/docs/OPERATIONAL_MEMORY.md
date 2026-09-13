# S360 operational memory — Liga Portugal 2026/27

This file is the persistent operational memory for the S360 Liga Portugal 2026/27 workstream. The repository is the operational source of truth.

## Non-negotiable publishing rules

| Area | Rule | Consequence |
|---|---|---|
| Milestone trigger | Generate a public comparison only when FC Porto, SL Benfica and Sporting CP have all reached the same comparison-game count. | Do not generate after isolated matches. |
| Discipline evidence | Each new match must be verified at match level against at least two independent source groups where possible. | Unverified matches remain provisional. |
| Discipline cards | Separate player cards from staff cards. Public totals use player cards only. | Staff cards stay in audit data, not public totals. |
| Second-yellow dismissal | Count a second-yellow dismissal as both one shown yellow and one player dismissal. | Avoid undercounting yellows or expulsions. |
| Source conflicts | Resolve and document source conflicts before discipline publication. | Undocumented conflicts block publication. |
| Refereeing evidence | Never infer zero errors from missing analysis. | Missing analysis keeps the match in review. |
| Refereeing totals | Only confirmed decisions enter public totals. | Candidate/disputed rows stay excluded. |
| Refereeing publishability | Do not mark a refereeing snapshot publishable until every played tracked match in scope is fully reviewed under the evidence threshold. | Partial review blocks public output. |
| Club emblems | Always use repository assets from `s360/assets/clubs/`; never recreate club emblems with image AI. | Prevents wrong/fictional logos. |

## Canonical club assets

| Club | Canonical asset path | Notes |
|---|---|---|
| FC Porto | `s360/assets/clubs/fc-porto.webp` | Use this crest in every future S360 infographic. |
| SL Benfica | `s360/assets/clubs/sl-benfica.webp` | Use this crest in every future S360 infographic. |
| Sporting CP | `s360/assets/clubs/sporting-cp.webp` | Use the 2026 Sporting symbol supplied by Martim; do not use older Sporting marks. |

## Current discipline comparison — publishable milestone 6

As of 2026-09-13, FC Porto, SL Benfica and Sporting CP have each completed six comparison matches. `discipline/snapshots/006.json` is publishable.

| Club | Games | Club fouls | Club yellows | Club reds | Fouls/game | Fouls/yellow | Opp. fouls | Opp. yellows | Opp. reds | Opp. fouls/game | Opp. fouls/yellow |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| FC Porto | 6 | 79 | 3 | 0 | 13.2 | 26.3 | 57 | 10 | 1 | 9.5 | 5.7 |
| SL Benfica | 6 | 76 | 9 | 0 | 12.7 | 8.4 | 93 | 17 | 1 | 15.5 | 5.5 |
| Sporting CP | 6 | 73 | 13 | 0 | 12.2 | 5.6 | 79 | 13 | 1 | 13.2 | 6.1 |

### Comparison game 6 match-level inputs

| Tracked club | Match | Tracked fouls | Opp. fouls | Tracked player yellows | Opp. player yellows | Tracked dismissals | Opp. dismissals | Staff cards excluded from public totals |
|---|---|---:|---:|---:|---:|---:|---:|---|
| FC Porto | Casa Pia 1–4 FC Porto | 10 | 13 | 1 | 4 | 0 | 0 | None located |
| SL Benfica | Benfica 3–1 Gil Vicente | 11 | 18 | 2 | 3 | 0 | 0 | None located |
| Sporting CP | Famalicão 1–1 Sporting | 10 | 14 | 3 | 2 | 0 | 1 | Carlos Carvalhal yellow stored as staff and excluded |

## Current refereeing state — milestone 6 NOT publishable

`refereeing/snapshots/006.json` is deliberately `publishable: false`.

| Item | Status | Public-total treatment |
|---|---|---|
| 14 earlier tracked matches through comparison game 5 | Pending explicit match-level backfill | Blocks publication |
| Moreirense–Benfica, 44m penalty | Disputed | Excluded |
| Casa Pia–FC Porto, 1m penalty claim | Disputed: Pedro Henriques says penalty/VAR error; VAR Bola Branca says correct no-penalty | Excluded |
| Casa Pia–FC Porto, 30m missed foul | Candidate | Excluded |
| Casa Pia–FC Porto, 45+4m missed Kaly foul/yellow | Confirmed by Pedro Henriques/A BOLA and VAR Bola Branca | Eligible only after the overall snapshot becomes publishable |
| Benfica–Gil Vicente, 18m Gil Martins challenge | Candidate red-card error, one current independent expert family | Excluded pending independent confirmation |
| Famalicão–Sporting | Awaiting named expert analysis after final whistle | No zero inference; blocks publication |

## Public-facing interpretation guardrails

| Claim type | Safe wording | Avoid |
|---|---|---|
| Small sample | “São apenas 6 jogos; vamos acompanhar a evolução jornada a jornada.” | Presenting causality as proven. |
| Porto yellow/foul asymmetry | “Por cada falta cometida, os adversários do Porto viram amarelo com uma frequência cerca de 4,6x superior à do próprio Porto.” | Saying referees are biased without publishable refereeing evidence. |
| Red cards | “The yellow/foul ratio counts yellows only; red cards are shown separately.” | Mixing reds into yellow/foul ratios. |
| Refereeing incomplete coverage | “Public refereeing totals remain withheld while the review backlog is incomplete.” | Publishing zeroes or partial totals. |

## Workflow

| Step | Data branch | Action | Publishable when |
|---|---|---|---|
| 1 | Discipline | Add match-level fouls, player cards, staff cards, source groups and conflicts. | Match is verified and conflicts are resolved. |
| 2 | Discipline | Rebuild deterministic snapshot for the equalised comparison milestone. | FC Porto, SL Benfica and Sporting CP all have the same comparison-game count. |
| 3 | Discipline | Generate infographic using repository club assets only. | Snapshot is publishable. |
| 4 | Refereeing | Add every played tracked match to the review queue. | Every match in scope exists in the queue. |
| 5 | Refereeing | Search official/VAR/named referee-analysis sources and record provenance. | Evidence threshold is met for every played tracked match. |
| 6 | Refereeing | Include only confirmed decisions in public totals. | Candidate/disputed decisions remain excluded and documented. |

## Named refereeing source families to search

| Source family | Examples |
|---|---|
| A BOLA | Pedro Henriques |
| Record | Marco Ferreira, Jorge Faustino, Iturralde |
| O JOGO | Jorge Coroado, José Leirós, Fortunato Azevedo |
| Rádio Renascença | VAR Bola Branca |
| Verdade Desportiva | Match-by-match referee decision analysis |
| VSPORTS | Match evidence / video incidents |
| Official material | Liga Portugal, match sheets, disciplinary records, VAR/official communications where available |
