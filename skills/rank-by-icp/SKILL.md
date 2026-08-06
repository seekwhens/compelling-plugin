---
name: rank-by-icp
description: Score the accounts in a Compelling list 0-100 against an ideal customer profile (ICP) using an explicit per-column rubric, then read the list sorted by fit. Use when the user wants to prioritize accounts, find best-fit companies, build a "who to work first" ranking, or asks for lead scoring.
---

# Rank accounts by ICP fit in Compelling

Ranking scores every account 0-100 from an **explicit rubric over insight columns** — no
black box. Costs 1 credit per account.

## Workflow

1. **Discover the columns** with `compelling_list_insights(record_type='accounts')` — you need each column's `question_id` and answer type. Rankable columns must exist and be researched first (see `enrich-contacts` / `build-tam-list`).
2. **Build the rubric with the user.** For each column pick exactly ONE points spec, matching its type, points 0-10:
   - `value_points` — for `boolean`, single-choice, and `tamCriteriaMatch` columns: map each value to points (e.g. `{"true": 10, "false": 0}`).
   - `range_points` — for `integer` columns: numeric ranges to points (e.g. 50-200 employees → 10).
   - `choice_points` — for multiple-choice columns: points per selected option.
   Weight what actually predicts fit; 3-5 columns beat ten noisy ones.
3. **Offer a cost preview** with `compelling_estimate_credits(action='rank_list')` (1 credit x accounts in the list).
4. **Start scoring** with `compelling_rank_list(weights=[...])`. Asynchronous — pass `wait_seconds` or long-poll `compelling_ranking_status`.
5. **Read the ranked list**: `compelling_read_list(record_type='accounts', sort_by=<ranking question_id>, sort_dir='desc')` for top-N by fit. The ranking column's `question_id` is returned by `compelling_rank_list` / `compelling_ranking_status`.

## Pitfalls

- Accounts-only: contacts cannot be ranked.
- A column with unresearched values contributes nothing for those accounts — enrich first, rank second.
- Ranking columns themselves cannot be ingested or re-ranked; re-run `compelling_rank_list` with a new rubric to re-score.
- Present the rubric back to the user before starting — the scoring is only as good as the agreed weights.
