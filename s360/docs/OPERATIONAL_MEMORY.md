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

## 2026-11-01 late audit — J10 Sporting foul reconciliation and named referee review

- **Discipline J9** remains the latest equalised and publishable comparison (9 completed games per club). J9 immutable cumulative totals independently recomputed from the 5-game baseline plus verified match records; all fourteen incremental matches (games 6–10) pass the 2-source metric-claim/conflict-resolution checks. `discipline/snapshots/009.json` still `publishable: true`.
- **J10 discipline (Casa Pia–Sporting, 30 October 2026)**: verified **Casa Pia 11–15 Sporting fouls**, with **2 shown player yellows each, no player dismissals**. Match-specific Flashscore and zerozero both record Sporting 15; worldfootball also 15; a different 14-foul FootballEdge reading remains in resolved-conflict audit. Prior non-match-specific Flashscore entry with 14 was stale and replaced. All played tracked J10 discipline matches are now verified, so `discipline/pending-verification.json` is clear. **SL Benfica–Alverca remains scheduled for 2 November 2026 at 20:15 (Lisbon)**: `discipline/snapshots/010.json` remains **blocked**. Partial J10 Sporting totals are 122 fouls, 23 player yellows, 1 red; opponents 127 fouls, 25 yellows, 1 red. FC Porto J10 141/10/0; opponents 108/16/3; Benfica J9 110/21/2; opponents 150/29/2.
- **J9 refereeing, Gil Vicente–FC Porto, 73' Santi García**: previously candidate missed yellow promoted to **confirmed internal refereeing error against Porto**, with unanimous **four named reviews** (Pedro Henriques/A BOLA; Marco Ferreira, Jorge Faustino and Iturralde/Record), incident https://verdadedesportiva.pt/lances/8080e179-37e3-4eb9-b900-9d9fe6afe5b4. The previous incorrect Elimbi red remains separately confirmed in Porto's favour. The actual on-field player card counts are not changed by missed hypothetical cautions.
- **J8 refereeing Marítimo–FC Porto, 20' Froholdt**: expert split **3 missed yellow vs 2 no error** (A BOLA, Record, Renascença) explicitly documented; incident stays **disputed**, not counted: https://verdadedesportiva.pt/lances/85ced58d-005a-40ca-8c81-d790b0ff3d8c.
- **J10 refereeing FC Porto–Estoril, 82' Souza contact**: Pedro Henriques/A BOLA plus Jorge Faustino and Marco Ferreira/Record and José Leirós/O JOGO favor missing yellow; Jorge Coroado and Fortunato Azevedo/O JOGO dissent (**4 vs 2 across 3 editorials**). Status **disputed** and **excluded** pending further corroboration; source https://verdadedesportiva.pt/lances/c96e2d15-15e4-494c-b3a8-35c922e8226c; A BOLA https://www.abola.pt/noticias/arbitragem-quase-perfeita-no-dragao-a-analise-de-pedro-henriques-ao-fc-porto-estoril-2026110100080659490.
- **Refereeing J9/J10**: all confirmed incidents remain **internal-only** and public totals remain `{}`, not numerical zero. The **24-match pending review queue** continues to block both snapshots, including 14 older backfills and further named reviews for J8–J10.
- **Infographic**: deterministically rendered a verified J9 square graphic from user's exact original J8 poster, preserving its visual layout and original Sporting white-lion crest (not redrawn by generative AI). Output `S360_Liga_Portugal_2026-27_Jornada_09_Disciplina_VERIFICADO.png` generated as a conversation artifact, not committed to GitHub. Displayed values are exactly `discipline/snapshots/009.json`; note expressly includes both after-final reds (Durán and Luís Fernando).
- **Validation**: re-aggregated game-6-to-10 fouls/player yellows/player reds from baseline-005 + every verified match and compared to snapshot 009/010: **zero mismatches**; for every verified match and field, >=2 source-group claims or documented resolved conflict: **zero validation failures**.

### Next required gate

Verify and ingest Benfica–Alverca after 2 Nov match; rebuild snapshot 010 only when all three clubs have played ten games and independent event verification passes. Continue backfilling historical refereeing evidence and close each reviewed tracked match under the named-source/official threshold before any public refereeing total.


## 2026-11-01 late named-source review: Sporting J9 closed; Académico–FC Porto J4 backfill

### Sporting CP 1–2 Académico de Viseu, 25 Oct 2026 (J9)
- Referee: Miguel Nogueira; VAR: Luís Ferreira.
- Full **13-incident** match sweep (8', 11', 16', 21', **22'**, 29', 36', 41', **45'**, 45+6', 74', 88', 90+4') against named assessments from **A BOLA (Pedro Henriques)**, **Record (Marco Ferreira, Jorge Faustino)**, **O JOGO (Coroado, Leirós, Fortunato)**, **Renascença Bola Branca**, plus match sheet/VSPORTS clips and Verdade Desportiva incident-index source attribution. Editorial independence counted per publication family rather than by number of reviewers.
- **22' Suárez missed yellow:** Jorge Coroado requires yellow, José Leirós and Fortunato disagree; **DISPUTED** (1/3, one publication family), excluded.
- **45' initially awarded Sporting penalty reverted by VAR:** Jorge Coroado calls the reversal wrong/penalty required, whereas Pedro Henriques, Marco Ferreira, Jorge Faustino, José Leirós and Fortunato Azevedo find the VAR correction appropriate (**5/6 no-error vs one dissent**); **DISPUTED** rather than treating majority as unanimity, excluded.
- **29' disallowed Académico goal:** Record and O JOGO reviewers consider the throw-in illegal; A BOLA states available images cannot determine whether heel was on line. Record this as residual evidentiary uncertainty: no **confirmed** refereeing error, not a false zero inferred from absent review.
- 36' main Verdade Desportiva match widget initially showed stale 'Em análise', but the incident-specific expert page and latest match page show **no penalty** from A BOLA, Record, O JOGO. Corrected based on primary sources.
- All other match issues reviewed; match status changed from pending to **complete** after the thresholded full match sweep. Note: this DOES NOT make milestone referee totals public, as older and other matches remain pending.
- Primary attribution: https://verdadedesportiva.pt/jogos/4ecddade-bead-4635-ae98-fafa1d630d91 ; A BOLA https://www.abola.pt/noticias/o-golo-anulado-ao-academico-e-o-penalti-revertido-ao-sporting-pedro-henriques-analisa-os-casos-2026102601113914088 ; Renascença https://rr.pt/bola-branca/noticia/futebol-nacional/2026/10/25/nota-4-para-miguel-nogueira-muito-boa-arbitragem/490711/ ; VSPORTS https://vsports.pt/vsports/jogo/i-liga/sporting-academico/30427/destaques .

### Académico de Viseu 0–3 FC Porto, 29 Aug 2026 (J4)
- Older game now represented in explicit refereeing match-review dataset. Reviewed game/result/date via worldfootball and A BOLA; **still pending** for full closure (33'/35' need cross-publisher confirmation).
- **30' André Silva missed yellow:** 3 pro and 3 against from A BOLA, Record and O JOGO — **DISPUTED**, excluded.
- **33' Froholdt missed yellow** and **35' António Correia missed yellow**: all three O JOGO experts agree but they are one publication group — two **CANDIDATES**, excluded.
- **57' Kahraman jersey hold on Gabri Veiga**: two independent editorial source groups (Pedro Henriques/A BOLA and Marco Ferreira & Jorge Faustino/Record), three agreeing reviewers — **CONFIRMED INTERNAL error AGAINST FC Porto**; excluded publicly until all tracked matches clear threshold.
- Source incident URLs: https://verdadedesportiva.pt/lances/95d15bac-270f-482b-8cca-3a1b9998c5df ; https://verdadedesportiva.pt/lances/0e2e3abf-ba21-4fdb-8b2f-e5ad2219b8d3 ; https://verdadedesportiva.pt/lances/2a02658f-1ed0-4a19-8674-4827dfa0bd62 ; https://verdadedesportiva.pt/lances/07f9eafe-f47d-40bf-a75a-0c17f2dfc70c .

### Publication gate and builder correction
- Current **round-9** referee review: **6 complete, 21 pending out of 27** tracked perspectives; round-10: **6 complete, 23 pending out of 29**. Public snapshots remain `publishable=false` and `public_totals={}`; no zero-error implication.
- `build_refereeing_snapshot` previously summed lengths of `matches.json` and `pending-review.json` when **eight pending match_ids occurred in both**, double-counting scope. Fixed builder to use **union of unique match_ids**, preserving independently tracked club perspectives. Added regression test.
- Discipline unchanged. Latest publishable common milestone still **J9**; Benfica–Alverca J10 scheduled **2 Nov 2026, 20:15 Lisbon**. Wait until it is completed and verified before any J10 public discipline comparison.

## 2026-11-02 00:08 UTC checkpoint — no J10 public milestone yet

- Latest completed equalised round remains **J9**. Its verified `discipline/snapshots/009.json` has `publishable: true`; source-conflict audits for Gil Vicente–Porto, Sporting–Académico, and Santa Clara–Benfica are retained. This is the source for the freshly reconstructed J9 social graphic using the **original J8 uploaded poster and untouched club crests**, including the authentic Sporting white-lion shield. The latest corrected graphic is exported as `S360_Liga_Portugal_2026-27_Jornada_09_Disciplina_VERIFICADO.png` in the conversation artifact workspace, and not committed as binary by the text-only connector. Its numerical fields exactly mirror snapshot 009 (Porto 128/9/0 vs 101/16/3; Benfica 110/21/2 vs 150/29/2; Sporting 107/21/1 vs 116/23/1; fouls/yellows/player dismissals).
- **J10:** Casa Pia 0–2 Sporting (30 Oct) and FC Porto 4–0 Estoril (31 Oct) both completed and already included in discipline match records with multiple-source verification. Earlier Sporting foul conflict is **resolved at 15**; do not regress it to pending. **Benfica–FC Alverca has not begun as at 00:08 Portugal on Monday 2 Nov**; scheduled kickoff **2 Nov 20:15** per Liga Portugal official match page https://www.ligaportugal.pt/match/20262027/ligaportugalbetclic/10/9 and VSPORTS https://vsports.pt/vsports/equipa/alverca/v20/jogos. Therefore snapshot 010 stays blocked, without guessing Benfica match metrics.
- **Refereeing:** checked fresh coverage of Casa Pia–Sporting (Pedro Henriques / A BOLA, 30 Oct) and FC Porto–Estoril (Verdade Desportiva / expert aggregation, 31 Oct / 1 Nov) and the latest official fixture material. No new sufficiently grounded adjudication warrants moving candidate/disputed entries to confirmed at this checkpoint. **6 complete, 23 pending played tracked perspectives** as already recorded by `refereeing/snapshots/010.json`. Preserve `public_totals={}`, `publishable=false`; no zero-error inference. Incidents and source provenance already in `refereeing/decisions.json` remain unchanged.
- **Workflow:** No discipline/refereeing data corrections necessary on this check because staged played matches are already reconciled. Keep PR #2 in draft pending review/merge; do not imply that the draft branch has been merged into `main`. Next comparison gate is completion and independent card/foul verification for Benfica–Alverca after kickoff.


## 2026-11-08 23:01 UTC checkpoint — J10 publishable; J11 completed but discipline pending Benfica full-time data

- **Latest equalised fully verified DISCIPLINE milestone:** J10 is publishable, snapshot `discipline/snapshots/010.json` (as-of 2 November 2026), consistent with original J9 reference graphics and exact 2026 Sporting crest. J10 cumulative (team fouls/yellows/player dismissals vs opponent same): **Porto 141/10/0 vs 108/16/3; Benfica 121/22/2 vs 165/32/2; Sporting 122/23/1 vs 127/25/1.** A 1254-square PNG matching original J9 S360 template exported as `S360_Liga_Portugal_2026-27_Jornada_10_Disciplina_VERIFICADO.png` to conversation artifact. The GitHub connector only supports UTF-8 text file commits, so the PNG is not a binary asset committed to the repository.
- **J11 all three matches completed:** Sporting 1-0 Moreirense (7 Nov), Vitória SC 1-2 FC Porto (8 Nov), Estrela 2-3 Benfica (8 Nov). Two match perspectives were fully promoted to verified in `discipline/matches.json`:
  - Sporting–Moreirense: Sporting **10 fouls, 0 yellows, 0 reds**; Moreirense **8 fouls, 0 yellows, 0 reds**. Independent full-time sources [Golazo News](https://www.golazonews.com/en/match/1575543/sporting-cp-vs-moreirense) and [My Football Facts/Statorium](https://www.myfootballfacts.com/match/primeira-liga-2026-27-sporting-vs-moreirense-2026-11-07/); [Pedro Henriques/A BOLA 8 Nov](https://www.abola.pt/noticias/tera-havido-penaltis-em-alvalade-pedro-henriques-analisa-2026110800180470986) and [José Leirós/Renascença 7 Nov](https://rr.pt/bola-branca/noticia/futebol-nacional/2026/11/07/nota-3-para-joao-goncalves-arbitragem-muito-positiva/492615/) both explicitly support 18 aggregate fouls and NO displayed cards.
  - Vitória SC–FC Porto: FC Porto **11 fouls, 4 player yellows, 0 reds**; Vitória **13 fouls, 2 player yellows, 0 reds**. Independent [ProMatch24](https://promatch24.com/match/746139/) and [TotalOdds](https://totalodds.co.uk/matches/vitoria-guimaraes-vs-porto-7615911) full-time source groups. Porto yellow players Borja Sainz 43', Pablo Rosario 43', Hwang In-beom 67', Alan Varela 90+7'; Vitória João Mendes and Toni Borevković both 33'. Vitória coach **Tiago Margarido yellow at 19' staff-only** explicitly EXCLUDED from player totals. Purple concussion-protocol player substitution cards are NOT discipline. OFStats earlier ~82-min partial capture 9/12 fouls and 3/2 yellows is STALE, not the final result, and rejected as such.
  - Estrela–Benfica: final 2–3 confirmed but match-specific FULL-TIME fouls and all shown player/staff card events still lack two reliable independent sources. Early live and pre-match sources must not be mistaken for full-time; preserve player Alisson Souza and Estrela Lovro Zvonarek yellows plus **staff-only Marco Silva and Pepa** in `discipline/pending-verification.json` pending. No unverified figures added to discipline database.
- **Discipline snapshot J11:** new `discipline/snapshots/011.json` produced with `publishable:false`. FC Porto and Sporting after 11 verified matches are shown as provisional partial reconciliation in the blocked file; Benfica remains at 10 verified matches, so NEVER share the partial chart as a comparative milestone. J11 pending discipline queue retains Benfica only. The validation cross-check for all published/verified match fields yielded **0 source-claim coverage / integrity mismatches** in this run. Second-yellow-red policy and staff exclusion preserved.
- **REFEREEING:** J11 three played perspectives already in `refereeing/matches.json` and `pending-review.json`; their named-source provenance expanded. At Sporting–Moreirense Pedro Henriques/A BOLA discusses 2',12',14',30',46',48',49',90+3' and José Leirós/Renascença calls a missed 12' yellow to Guilherme Liberato. Three fresh **candidate** incident rows (12' Maxi gesture yellow, 12' Liberato unshown yellow, 30' Liberato shirt pull missed free kick) now in `refereeing/decisions.json`; none independently meets two-publication confirmation threshold, **none promoted**. [Renascença Vitória–Porto Tiago Rocha video 8 Nov](https://rr.pt/video/bola-branca/2026/11/08/nota-3-para-david-silva-no-v-guimaraes-1-2-fc-porto/495962/) and [A BOLA Pedro Henriques 8 Nov video](https://www.abola.pt/video/v-guimaraes-fc-porto-pedro-henriques-analisa-situacao-completamente-inedita-2026110821435927425) are located but no reliable per-incident video transcript, **not expert adjudications**. Official/VAR and named Record/O JOGO/Verdade Desportiva/VSPORTS families searched; unavailable post-game specifics never imply no errors. Estrela–Benfica retrospective refereeing analysis pending. **Refereeing snapshot J11 remains non-publishable: 6 of 33 perspectives completed, 27 pending, public_totals={} (withheld), not zero errors.** Three new candidates added to excluded list of `refereeing/snapshots/011.json` without touching previously confirmed internal verdicts.
- Changes are staged on existing draft PR #2 branch `s360/j8-evidence-review-20261012`; `main` is unchanged. Do not claim the PR has merged. Latest fully verified J10 social card is conversation artifact, not a GitHub binary commit.


## 2026-11-08 23:35 UTC checkpoint — J11 DISCIPLINE VERIFIED AND PUBLISHABLE

**Completion:** Sporting 1-0 Moreirense (7 Nov), Vitória SC 1-2 Porto (8 Nov), Estrela Amadora 2-3 Benfica (8 Nov) mean all three tracked clubs have **11 played league matches**. No other unfinished league fixture blocks the tracked-club 11-game comparison.

**Benfica J11 match-level verification, newly ingested:** SL Benfica **12 fouls, 0 shown player yellows, 0 player reds**; Estrela **15 fouls, 2 shown player yellows, 0 player reds**. Estrela player cautions Lovro Zvonarek 51', Alisson Souza de Jesus (Alisson Jesus) 89'. One Benfica staff yellow to coach **Marco Silva** and one Estrela staff yellow to coach **Pepa** are stored separately and EXCLUDED from player totals. Independent full-time foul source groups: [FootyPulse](https://footypulse.org/matches/liga-portugal/estrela-amadora-vs-benfica-2026-11-08) and [worldfootball](https://www--worldfootball--net.c.hs-data.com/match-report/co123/portugal-primeira-liga/ma12223831/estrela-amadora_sl-benfica/team-statistics/); player-only event groups [FootyPulse](https://footypulse.org/matches/liga-portugal/estrela-amadora-vs-benfica-2026-11-08) and [FotMob/Opta](https://www.fotmob.com/pt-PT/matches/benfica-vs-estrela-da-amadora/7hyaphua), staff coach booking independently [A BOLA liveblog](https://www.abola.pt/futebol/jogo/estrela-da-amadora-benfica-11216339/liveblog).

**Source discrepancies RESOLVED:**
- worldfootball 3 Estrela / 1 Benfica team-aggregate yellows includes coach/staff 1 on each side, while two match event groups explicitly show 2 Estrela **player** yellows and 0 Benfica **player** yellows. Do not propagate all-subject team-card totals into player disciplinary series.
- Prior provisional pending JSON mistakenly assigned 89' Alisson Souza caution to Benfica. FotMob and FootyPulse confirm this is **Estrela** player Alisson Souza/Alisson Jesus; corrected verified match event and deleted provisional entry. Preserve both discrepancy notes in `discipline/matches.json`.
- No dismissed players or second-yellow dismissals at Estrela–Benfica; historical second-yellow policy unchanged (shown yellow + player dismissal, never count staff in player totals).

**J11 deterministic discipline snapshot**: `discipline/snapshots/011.json` now **publishable=true**, `blocking_reasons=[]`; `discipline/pending-verification.json` empty. Rebuilt from immutable 5-game baseline and 18 incrementally verified (games 6–11) tracked-club match records. Assertions checked all six claimed fields for each incremental match against >=2 independent source groups (or resolved conflict), **zero validation failures**.
- FC Porto: team **152 fouls / 14 yellows / 0 reds**; opponents **121 / 18 / 3**.
- SL Benfica: team **133 / 22 / 2**; opponents **180 / 34 / 2**.
- Sporting CP: team **132 / 23 / 1**; opponents **135 / 25 / 1**.
- Display metrics: Porto 13.8 fouls/g, 10.9 fouls/yellow; opponents 11.0/6.7. Benfica 12.1/6.0; opponents 16.4/5.3. Sporting 12.0/5.7; opponents 12.3/5.4.
- J11 social asset delivered as `S360_Liga_Portugal_2026-27_Jornada_11_Disciplina_VERIFICADO.png` 1254×1254 in ChatGPT conversation, directly **edited from verified J9 original source**, preserving genuine 2026 Sporting white-lion crest and all club logos with no AI reconstruction. File exists in conversation artifact filesystem; not committed as binary to GitHub (connector text-only).

**REFEREEING independently BLOCKED:** J11 all three played perspectives staged, but thresholded full review only **6 of 33**, 27 pending. Benfica–Estrela factual match events from FotMob/FootyPulse/worldfootball, and official appointment of António Nobre + VAR Tiago Martins, do NOT equal an expert referee error verdict. Pedro Henriques/A BOLA, Marco Ferreira/Jorge Faustino/Iturralde/Record, Coroado/Leirós/Fortunato/O JOGO, Renascença VAR Bola Branca, Verdade Desportiva, VSPORTS and FPF/Liga/VAR coverage reviewed/search-checked in this check; recent independently attributable incident decisions remain under the required threshold, hence Benfica match pending and no new confirmed incident. Existing confirmed internal entries remain held, candidate/disputed entries excluded; `refereeing/snapshots/011.json` **publishable=false, public_totals={} withheld (NOT 0 errors)**.

**GitHub scope:** modifications only on draft PR #2 branch `s360/j8-evidence-review-20261012`; `main` untouched. Next weekly check: detect next equalized completed league round, audit two independent sources per match and continue referee review queue, especially 27 pending older/newer perspectives. Do NOT publish referee totals until every perspective is fully reviewed.

## 2026-11-09 J11 source reconciliation follow-up (public totals unchanged)

- Independent recomputation of J11 discipline from verified comparison game 5 baseline and 18 verified J6–J11 match records: **zero mismatches**, verified snapshot J11 publishable, no discipline records pending. Porto **152/14/0** vs 121/18/3; Benfica **133/22/2** vs 180/34/2; Sporting **132/23/1** vs 135/25/1.
- Vitória–Porto staff discipline: A BOLA full match live records **Rui Correia (Porto team manager)** warned at 19' in addition to Vitória coach Tiago Margarido; added as `subject_type=staff` (excluded from player caution counts).
- Vitória–Porto Borja Sainz yellow corrected **43'→38'**. A BOLA and xg.football report a post-goal celebration caution to Borja 38'; 43' belongs to Pablo Rosario. ProMatch24 had an ambiguous chronology; conflict explicitly documented/resolved, unchanged yellow totals.
- Vitória–Porto referee 56' Gonçalo Nogueira/Froholdt contact only a **CANDIDATE** missed-penalty allegation. Original A BOLA minute-by-minute appeal and coach Tiago Margarido's post-match statement (also repeated by Record) are **not independent referee-expert confirmation**. Reference: https://www.abola.pt/noticias/o-froholdt-nem-olha-para-a-bola-faz-uma-placagem-ao-goncalo-nogueira-2026110819101454211 .
- Renascença VAR Bola Branca Tiago Rocha gave David Silva grade 3 at https://rr.pt/video/bola-branca/2026/11/08/nota-3-para-david-silva-no-v-guimaraes-1-2-fc-porto/495962/ ; VSPORTS footage https://superportistas.pt/video/resumo-vitoria-sc-1-2-fc-porto-133391/ was located, no incident-specific independently reviewed verdict transcribed. Decision stays **CANDIDATE**, not in totals; match queue still incomplete.
- J11 refereeing remains **NOT PUBLISHABLE** (6/33 complete, 27 pending). Public totals are WITHHELD as `{}` not zero. J11 infographic created from the original verified J9 artwork using existing club emblems with no image-generated crest; 1254×1254 PNG conversation artifact.
