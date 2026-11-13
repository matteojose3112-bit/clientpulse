# ClientPulse Roadmap

ClientPulse is a completed frontend MVP demonstrating a customer-success account portfolio. The original roadmap explored a much larger platform; this closeout records what was actually built and separates deferred ideas from delivered functionality.

## Project Status

**MVP complete · Maintenance mode**

The current project scope is the deployed frontend demonstration. No backend, multi-user, CRM, or automation functionality is implied.

---

## Phase 1 — Functional Frontend MVP

**Status: Complete**

- [x] Create GitHub repository
- [x] Set up React + TypeScript + Vite
- [x] Configure ESLint and production build
- [x] Create customer data model and sample records
- [x] Display customer information and health statuses
- [x] Add interactive health updates
- [x] Add demonstration health scores and portfolio metrics
- [x] Add reusable metric and customer components
- [x] Add responsive dashboard sections
- [x] Add sample activity feed and risk summary
- [x] Add customer search and health filtering
- [x] Add empty-state handling and filter reset
- [x] Persist customer changes in browser local storage
- [x] Validate restored records before using browser-saved customer data
- [x] Reject duplicate or non-positive IDs, blank required fields, invalid health statuses, malformed fields, and out-of-range scores
- [x] Keep the dashboard usable when browser storage reads or writes fail
- [x] Add focused Node.js unit tests for validation, fallback, duplicate IDs, blank fields, and storage failures
- [x] Verify the initial unit-test, lint, and production-build CI run (GitHub Actions run #19 passed)
- [x] Verify CI after stricter required-field and ID validation changes (GitHub Actions run #24 passed on PR head `7b0a5f6`)
- [x] Configure and publish GitHub Pages deployment
- [x] Add GitHub Actions CI for lint and production build
- [x] Document MVP scope, limitations, and maintenance status

## Deferred Ideas — Not Part of the Completed MVP

The following items appeared in the original long-term vision but were not implemented. They are not required to consider the current frontend MVP complete.

### Customer-success workflows
- [ ] Customer detail views
- [ ] Follow-up task creation and completion
- [ ] Due dates and task prioritization
- [ ] Customer notes and activity history
- [ ] Onboarding milestones and account ownership

### Health and risk intelligence
- [ ] Evidence-based health-score factors
- [ ] Inactivity detection and risk indicators
- [ ] Escalation conditions and renewal-risk tracking
- [ ] Customer segmentation and risk trends

### Backend and integrations
- [ ] Persistent server-side database
- [ ] REST API and authentication
- [ ] Multi-user accounts and authorization
- [ ] CRM and product-usage integrations
- [ ] Webhooks and data synchronization

### Automation and analytics
- [ ] Automated follow-up and onboarding workflows
- [ ] Risk alerts and notifications
- [ ] Retention and renewal reporting
- [ ] Advanced analytics and executive reporting

These ideas should only be revisited if there is a clear practical reason and a deliberate decision to expand the project beyond its MVP.

---

## Maintenance Scope

ClientPulse should remain stable and accurately represented as a frontend demonstration.

Maintenance may include:
- Fixing reproducible defects
- Keeping dependencies and CI healthy
- Correcting documentation or deployment issues
- Addressing clear accessibility or responsive-layout defects

Manual browser smoke testing of the currently deployed GitHub Pages build confirmed rendering, customer list visibility, search, health filtering, and in-session status updates, with no visible console or network errors. A status edit reverted after reload on that deployed build. PR #3 remains unmerged, so the updated storage-validation code has not yet been deployed and its persistence behavior is not verified live. Mobile/tablet coverage beyond the browser session, keyboard-only interaction, and rendered contrast review remain pending.

## Current PR Review State — 2026-11-12

- PR #3 is open, draft, and mergeable; its latest head commit is `7b0a5f6`.
- GitHub Actions run #24 passed the 11 unit tests, lint, and production build for that commit.
- No submitted PR reviews or inline review threads were present at the time of review.
- The next gated milestone is human review and approval. Do not mark the PR ready, merge it, or deploy it without explicit approval.
- After an approved merge/deployment, perform branch-specific browser checks for persistence, malformed saved data, and storage write failures.

## Guiding Principle

> **A clearly scoped, working MVP is better than an unfinished promise of a larger platform.**

The current milestone is complete. Further development is optional, not an outstanding requirement.

---

Review date: 2026-11-12

## Current direction — 2026-11-12

**MVP complete · Maintenance mode.** No additional platform features are required for the current milestone. Prioritize defect fixes, dependency/CI maintenance, documentation accuracy, and manual browser/accessibility checks. Browser persistence now validates restored records and degrades safely when storage is unavailable. Only reopen deferred backend or workflow ideas if a concrete use case justifies expanding beyond the frontend demonstration.


## Accessibility & Responsive Review — 2026-11-13

- [x] Audit live layout at 360px, 768px, and 1440px; no overflow, clipping, or overlap observed.
- [x] Check keyboard reachability of navigation, search, filters, and health controls.
- [x] Confirm skip link exists and is keyboard-visible.
- [x] Move skip link to the first focusable position and place the header outside the main landmark.
- [x] Keep closed mobile-menu links out of keyboard navigation and the accessibility tree with `inert` and `aria-hidden`.
- [x] Improve contrast of placeholder text, interactive control borders, and secondary interface text.
- [x] Announce filtered account-count updates through a status region.
- [x] Verify source already has associated labels, one primary h1, and reduced-motion CSS; no unnecessary duplicate fixes.
- [x] Run CI on the latest accessibility source changes (GitHub Actions runs #32 and #33 passed unit tests, lint, and production build).
- [ ] After an approved deployment, repeat keyboard and responsive checks against the updated branch.
- [ ] Perform actual screen-reader testing and measure exact computed contrast and mobile touch-target sizes.

The live audit tested the currently deployed version. The improvements above are on open PR #3 and are not live until separately approved and deployed.
