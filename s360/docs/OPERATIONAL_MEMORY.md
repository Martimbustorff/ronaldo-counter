# S360 operational memory — Liga Portugal 2026/27

This file is the persistent operational memory for the S360 Liga Portugal 2026/27 workstream. When ChatGPT memory is unavailable inside a tool-heavy conversation, this repository file is the fallback source of truth.

## Non-negotiable publishing rules

| Area | Rule | Consequence |
|---|---|---|
| Milestone trigger | Generate a public comparison only when FC Porto, SL Benfica and Sporting CP have all reached the same comparison-game count. | Do not generate after isolated matches. |
| Benfica catch-up | If Benfica has a postponed/catch-up game, generate only when that match equalises the sample. | A catch-up match can unlock a new panel. |
| Discipline evidence | Each new match must be verified at match level against at least two independent source groups where possible. | Unverified matches remain provisional. |
| Discipline cards | Separate player cards from staff cards. Public totals use player cards only. | Staff cards stay in audit data, not public totals. |
| Second-yellow dismissal | Count a second-yellow dismissal as both one shown yellow and one player dismissal. | Avoid undercounting yellows or expulsions. |
| Source conflicts | Resolve and document source conflicts before publication. | Undocumented conflicts block publication. |
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

## Current discipline comparison baseline

As of the 5-game equalised milestone, the three clubs each have 5 tracked Liga Portugal 2026/27 matches in the discipline comparison.

| Club | Club games | Club fouls | Club yellows | Club reds | Club fouls/game | Club fouls per yellow | Opponent games | Opponent fouls | Opponent yellows | Opponent reds | Opponent fouls/game | Opponent fouls per yellow |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| FC Porto | 5 | 69 | 2 | 0 | 13.8 | 34.5 | 5 | 44 | 6 | 1 | 8.8 | 7.3 |
| SL Benfica | 5 | 65 | 7 | 0 | 13.0 | 9.3 | 5 | 75 | 14 | 1 | 15.0 | 5.4 |
| Sporting CP | 5 | 63 | 10 | 0 | 12.6 | 6.3 | 5 | 65 | 11 | 0 | 13.0 | 5.9 |

## Public-facing interpretation guardrails

| Claim type | Safe wording | Avoid |
|---|---|---|
| Small sample | “São apenas 5 jogos; a próxima jornada mostra se a diferença reduz.” | Presenting causality as proven. |
| Porto yellow/foul asymmetry | “Por cada falta cometida, os adversários do Porto viram amarelo com uma frequência 4.7x superior à do próprio Porto.” | Saying referees are biased without refereeing-panel evidence. |
| Red cards | “The yellow/foul ratio counts yellows only; red cards are shown separately.” | Mixing reds into yellow/foul ratios. |
| Benfica previous pending game | “The Benfica catch-up match equalised the 5-game sample.” | Saying Benfica still has one game fewer after the catch-up is included. |

## Workflow table

| Step | Data branch | Action | Publishable when |
|---|---|---|---|
| 1 | Discipline | Add match-level fouls, player cards, staff cards, source groups and conflicts. | Match is verified and conflicts are resolved. |
| 2 | Discipline | Rebuild deterministic snapshot for the current equalised comparison-game milestone. | FC Porto, SL Benfica and Sporting CP all have the same comparison-game count. |
| 3 | Discipline | Generate infographic using repository club assets only. | Snapshot is publishable and assets load from `s360/assets/clubs/`. |
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
