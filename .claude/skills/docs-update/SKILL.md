---
name: docs-update
description: Update the Confluence Features and Changelog pages after a pull request merges, then move the Jira ticket to Done. Use when a PR has merged or when asked to bring the docs up to date.
---

# Docs update after a merge

Input: one merged pull request.

Commit nothing to the repo. All output goes to Confluence and Jira.

## 1. Read

1. Read the PR title, body and diff. Confirm the PR is merged. If it is not, stop.
2. Take the Jira key from the PR title (`KAN-<number>`). Read the ticket.
3. Read the current Confluence pages in the space "Standup Roulette": Overview, Features, Changelog.

## 2. Confluence

The space has three pages. Do not create more pages.

| Page | Content | When to change it |
|---|---|---|
| Overview | What the app does and how to run it | Only if the merge changes how to run or use the app |
| Features | One short section per feature, describing behaviour | If the merge adds or changes behaviour a user can see |
| Changelog | One dated entry per merged PR | Always |

**Features.** One `##` section for each feature, two to five sentences, written for a user. Describe what the app does now, not how the code works. Update the existing section if the feature is already there. Do not add a section for refactors, tests or build changes.

**Changelog.** Add the new entry at the top:

```
### <YYYY-MM-DD>: <PR title>
<one or two sentences on what changed for the user>
Ticket: <Jira link> | PR: <PR link>
```

If an entry for this PR already exists, do not add a second one.

Keep the rest of each page as it is.

## 3. Jira

1. Add a comment on the ticket: "Merged in <PR link>. Docs updated."
2. Move the ticket to **Done**.

If the PR title has no Jira key, write the Changelog entry without a ticket link and skip this step.

## Report

End with: the pages you changed, the Changelog entry text, and the final ticket status.
