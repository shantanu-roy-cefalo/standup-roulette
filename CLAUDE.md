# Standup Roulette

A spinning wheel that picks who speaks first at standup.

## Stack

- TypeScript, Vite, Vitest. No framework.
- Front end only. No backend, no API calls, no network requests at runtime.
- Hosted on GitHub Pages at `/standup-roulette/`. Vite's `base` must stay `'/standup-roulette/'`, or the deployed page loads blank.

## Commands

| Purpose | Command |
|---|---|
| Install | `npm ci` |
| Dev server | `npm run dev` |
| Tests (single run) | `npm test` |
| Build (type-check + bundle) | `npm run build` |
| Serve the built app | `npm run preview` |

## Code rules

- Source lives in `src/`. Tests sit next to the code as `*.test.ts`.
- Keep logic that can be tested (picking a winner, wheel geometry, parsing, storage) in pure functions, separate from DOM and canvas code.
- Add no runtime dependency unless the ticket asks for one.
- Keep changes scoped to the ticket. Do not refactor unrelated code.

## Tracking

- Jira project key: `KAN`. Ticket keys look like `KAN-12`.
- Statuses: Proposed, Ready for Claude, In Progress, In Review, Done, Won't Do, Needs Info.
- Only a person moves a ticket to Ready for Claude. From Proposed, that move is the approval to build. From In Review, it is the approval to fix the review findings on the open PR.
- Confluence space "Standup Roulette" has three pages: Overview, Features, Changelog.
- Slack: automated posts go to the destination that the task prompt names. With none named, they go as a direct message to the account the Slack connector is signed in as.

## Pull requests

- Branch: `claude/<jira-key>-<short-slug>`, for example `claude/KAN-12-footer-version`.
- Title: `<JIRA-KEY>: <summary>`, for example `KAN-12: Show the version in the footer`.
- Body has exactly these three headings:
  - `## What changed`: the changes, as a short list.
  - `## Why`: the reason, with a link to the Jira ticket.
  - `## Verification`: test and build results, each acceptance criterion with its evidence, the browser check, and the self-review result.
- One ticket per PR.
- In cloud sessions, use the session's GitHub tools for pull requests and comments. The `gh pr` and `gh issue` commands are not available there.

## Definition of done

- `npm test` passes.
- `npm run build` passes.
- New behaviour has tests, written before the code.
- Each acceptance criterion is checked, in a test or in the built app in a browser.
- The diff has had a self-review, and its blocker and should-fix findings are fixed.
- Screenshots are evidence, not source. Never commit them.
- Add no browser automation dependency. Browser checks use the `agent-browser` CLI from the environment.
- The PR follows the format above.

## Skills

| Skill | Use it to |
|---|---|
| `build-ticket` | Implement a Jira ticket and open the PR |
| `review-pr` | Review a pull request |
| `triage` | Scan the codebase and file findings |
| `docs-update` | Update Confluence after a merge |
| `agent-browser` | Walk through the built app in a browser |
