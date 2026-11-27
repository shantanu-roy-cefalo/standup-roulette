---
name: triage
description: Scan this codebase for security issues, bugs, performance problems, tech debt and improvements, then file one Jira ticket per new finding and post a ranked summary to Slack. Use for a codebase triage, audit or health scan.
---

# Codebase triage

This is a read-only scan. Do not change code, do not create branches, do not open PRs.

## 1. Scan

Read every file in `src/`, plus the config files and workflows. Run `npm ci`, `npm test` and `npm run build`, and note failures.

Look for findings in these categories:

| Category | Examples |
|---|---|
| Security | User-controlled text inserted as HTML, unsafe URL handling, risky dependencies |
| Bug | Wrong results, unfair or broken logic, unhandled edge cases, failing tests |
| Performance | Work that continues when it is not needed, leaks, needless re-renders |
| Tech debt | Duplicated code, magic numbers, oversized functions, missing tests |
| Improvement | Accessibility, UX gaps, missing docs |

A finding needs evidence: a file, a line range, and a concrete way it goes wrong. Leave out anything you cannot show.

## 2. Remove duplicates

1. Search Jira for **all** tickets in project `KAN`, in every status. Include **Done** and **Won't Do**.
2. A finding is a duplicate if a ticket describes the same problem in the same code, even with different words.
3. Do not file duplicates. A **Won't Do** ticket means a person rejected the idea: do not file it again and do not reopen it.

## 3. File tickets

Create at most 8 tickets per run, highest severity first. Create each one in project `KAN`, status **Proposed**, label `triage`.

- Summary: `[<Category>] <the problem in a few words>`
- Description:

```
Problem: <what is wrong, in one or two sentences>
Where: <file path and line range>
Impact: <what a user or developer sees>
Suggested fix: <a specific approach>
Acceptance criteria:
- <a checkable result>
- <a test that proves it>
Severity: High | Medium | Low
Size: S | M | L
```

Size S means one file and less than an hour of work.

Never move a ticket out of Proposed. A person approves work by moving the ticket.

## 4. Post to Slack

Post one message to the Slack destination that the task prompt names. If the prompt names none, send it as a direct message to yourself, that is, to the Slack account the connector is signed in as. Do not post to any other channel.

```
Standup Roulette triage, <date>
<N> new findings, <M> skipped as duplicates. Tests: pass|fail. Build: pass|fail.

1. [High] [Security] <summary> (S) <ticket link>
2. [Medium] [Bug] <summary> (M) <ticket link>
...
Move a ticket to "Ready for Claude" to have it built.
```

Rank by severity, then by size (smallest first). If there are no new findings, post one line that says so.

## 5. Findings report

If the task gives you an existing artifact to keep current, update that artifact: the date, counts by category, and a table of all open findings with ticket links. Do not create a new artifact.

## Report

End with: the number of findings, the tickets created, the duplicates skipped, and the Slack message link.
