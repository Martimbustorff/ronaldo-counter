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

## 2026-11-01 review — J9 discipline publishable; J10 not yet equalised

### Current comparison milestone 9 (as at 26 October 2026)

J9 reached 9 games each (FC Porto, SL Benfica, Sporting CP). Match-level discipline 8/9 was reconciled through official match stats, player-event logs and independent sources; `discipline/snapshots/008.json` and `009.json` are deterministic and `publishable: true`. The last previously published J7 snapshot remains immutable.

| Club | Team fouls | Team player yellows | Team reds | Opp. fouls | Opp. yellows | Opp. reds |
|---|---:|---:|---:|---:|---:|---:|
| FC Porto | 128 | 9 | 0 | 101 | 16 | 3 |
| SL Benfica | 110 | 21 | 2 | 150 | 29 | 2 |
| Sporting CP | 107 | 21 | 1 | 116 | 23 | 1 |

#### Material resolved source conflicts

- Gil Vicente–FC Porto (24 Oct, J9): earlier Dia de Jogo **16 Porto/18 Gil** versus official Liga Portugal/OFStats/Footlab **17–17**. Adopted **17–17** and retained dissent as conflict provenance.
- Sporting–Académico (25 Oct, J9): early Dia de Jogo **12 Sporting/11 Académico**, whereas Liga Portugal and corroborating match stats **14/9**. Correct Sporting player yellows **2** (Doumbia, Maxi Araújo), opponent **4**. A secondary site displays 1 Sporting yellow; event audit confirms two.
- Santa Clara–SL Benfica (26 Oct, J9): **17–13 fouls**, **4–5 player yellows**. Post-final direct-red player dismissals to **Jhon Durán** (Benfica) and **Luís Fernando (Fernando Oliveira)** (Santa Clara) are counted in S360 despite being absent from some feeds that freeze at final whistle. Durán had an earlier *separate yellow* at 89'; this is **not** a second-yellow dismissal. Other reds to staff/directors (Benfica: Mário Branco and Gonçalo Santos; Santa Clara: Tiago Pinto) are retained as staff, excluded from player totals. Early zerozero event briefly labelled Santa Clara player Welinton Torrão, but the official club match centre citing Liga Portugal match sheet, A BOLA reporting the FPF disciplinary bulletin on 29 Oct, and independent match-event feeds identify **Luís Fernando** as the single Santa Clara player expelled. The incorrect initial name remains documented in source conflict provenance. These after-final reds did not reduce on-field player numbers.

### J10 games and blockers

- Casa Pia–Sporting (30 Oct): played; discipline event evidence staged `pending` due conflicting Sporting foul counts 14/15 pending further official check.
- FC Porto–Estoril (31 Oct): played; discipline match appended with verified 13–7 foul and 1–0 player yellows.
- SL Benfica–Alverca: scheduled **2 November 2026, 20:15 local Portugal**. No J10 three-club comparison yet. `discipline/snapshots/010.json` deliberately `publishable: false`.

### Refereeing publication gate unchanged

J9 and provisional J10 match/incident evidence is stored in `refereeing/matches.json`, `decisions.json` and `pending-review.json`. A confirmed incident in Gil Vicente–FC Porto (Elimbi incorrect direct red, beneficial to Porto) and J10 Casa Pia–Sporting (missed Ofori yellow/foul against Sporting) are **internal-only** until the entire tracked scope meets review threshold. Other J9/J10 incidents marked candidate or disputed do not affect public totals. 14 earlier comparison-match backfills plus the newer J7–J10 outstanding expert checks block **refereeing/snapshots/009.json** and **010.json**. Public totals intentionally empty, not zero. The match pending queues must be exhausted before publication.

### Image policy

J9 discipline social graphic generated from published J8 layout reference with exact original club crest crops, including the **Sporting CP white-lion shield from the original user-supplied J8 graphic**. Never regenerate a crest with ImageGen. Image was exported from the local run as `S360_Liga_Portugal_2026-27_Jornada_09_Disciplina.png`; source datasets and snapshots are in GitHub branch pending PR review. Link artifact in the user notification.

**Santa Clara red recipient identity correction verified 2026-11-01:** https://www.slbenfica.pt/pt-pt/futebol/match-center/santa-clara-benfica-26-outubro-2026 and https://www.abola.pt/noticias/benfica-mario-branco-suspenso-20-dias-2026102914325018999 establish **Luís Fernando**, not Torrão. The overall J9 public snapshot metrics are unchanged (1 Santa Clara player dismissal for the Santa Clara–Benfica match). The graphical note must name Durán and Luís Fernando.
