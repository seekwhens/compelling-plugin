---
name: build-tam-list
description: Source a target market (TAM) list of companies in Compelling. Use when the user wants to build a lead list, find companies matching an ICP ("B2B SaaS in DACH, 50-500 employees"), source accounts for outbound, or start any new prospecting effort from scratch.
---

# Build a TAM list in Compelling

Source companies that match a target-market definition into a fresh Compelling list.

## Workflow

1. **Confirm the workspace** with `compelling_whoami` and tell the user which workspace you are operating in before touching data.
2. **Mint a fresh list** with `compelling_create_list` — never source into an existing list unless the user explicitly asks. Share the returned link so the user can open the list in Compelling.
3. **Clarify the TAM definition** before spending credits. You need:
   - a natural-language `search_prompt` (e.g. "B2B SaaS companies in the DACH region, 50-500 employees")
   - at least one per-company match `criteria` (each becomes a checkable column, e.g. "has a mobile app", "sells to enterprises")
   - a `target_size` (how many fully-matched companies the user wants, max 500)
4. **Offer a cost preview** with `compelling_estimate_credits(action='find_companies')` — sourcing costs 5 credits + criteria cost per company. Ask whether the user wants the estimate; do not price every run automatically.
5. **Start sourcing** with `compelling_find_companies`. It runs asynchronously.
6. **Wait server-side, don't busy-poll**: pass `wait_seconds` on the call, or check `compelling_tam_sourcing_status` with `wait_seconds` up to 60 — one long-poll call instead of sleeping and retrying.
7. **Read results** with `compelling_read_list(record_type='accounts')` — that is ground truth, counters in status responses settle a few seconds late.

## Pitfalls

- `prompt_ambiguous` status means the search prompt was too broad — refine it with the user and restart rather than retrying unchanged.
- Do not stack unrelated segments into one list; one TAM definition per list keeps criteria columns meaningful.
- After sourcing, the natural next steps are contacts and enrichment — see the `enrich-contacts` skill — and scoring, see `rank-by-icp`.
