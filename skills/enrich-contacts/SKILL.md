---
name: enrich-contacts
description: Find contacts for accounts in a Compelling list and enrich them (work emails, LinkedIn profiles, phone numbers, job titles) or enrich accounts with any data point (revenue, tech stack, funding, custom questions). Use when the user wants decision-makers, verified emails, or any researched attribute on companies or people.
---

# Find and enrich contacts in Compelling

The single most important rule: **contact discovery and enrichment are separate steps.**
`compelling_find_contacts` returns only name + job title. Emails, phone numbers, LinkedIn
URLs, and every other data point are **insights** — columns you define once and then research.

## Workflow

1. **Confirm the workspace** (`compelling_whoami`) and locate the list (`compelling_list_lists`).
2. **Find contacts** for the accounts with `compelling_find_contacts`:
   - Pass `roles` (title + optional persona + `per_title_limit`) to define who to look for, or omit to use the list's configured roles.
   - Cap spend with `limit` (accounts processed). Costs 2 credits per contact — offer `compelling_estimate_credits(action='find_contacts')` first.
   - It is asynchronous: pass `wait_seconds`, or long-poll `compelling_contacts_run_status`.
3. **Define the enrichment column** with `compelling_add_insight` (free — defining a column researches nothing):
   - Contacts: `email`, `personalLinkedin` (NOT `linkedinUrl` — that is the account-level value), `salutation`, `phoneNumber`, `premiumPhoneNumber`.
   - Accounts: `revenue`, `industry`, `employees`, `linkedinUrl`, `hqPhone`, …
   - Anything else is a custom type (`boolean`, `singleChoice`, `multipleChoice`, `integer`, `entity`, `url`, `date`, `jobtitle`, …) and needs a `question` + `header_name`; for accounts include `{company_name}` and `{domain}` in the question.
   - Reuse existing columns — check `compelling_list_insights` before adding duplicates.
4. **Research the values** with `compelling_run_insight`. It requires an **explicit scope**: pass `account_ids`/`contact_ids` or a `limit` — there is no "run on everything" default. Credit-spending; offer an estimate first.
5. **Poll** `compelling_insight_status` (with `wait_seconds`), then **read values** via `compelling_read_list` — ground truth.

## Bringing your own data

If the user already has accounts/contacts (CRM export, CSV), write them directly with
`compelling_ingest_records` — no research, zero credits. Identify accounts by `domain`
(resolve-or-create) or `account_id` (attach existing). Known values go in as final insight
answers via existing `question_id`s.

## Pitfalls

- There is no single "find contacts with email" call — find contacts first, then run the email insight on them.
- `record_type='accounts'` takes `account_ids`; `contacts` takes `contact_ids` — never mix.
- Counters are eventually consistent; trust `compelling_read_list`, not run counters.
