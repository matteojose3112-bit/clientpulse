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

## Current PR Review State — 2026-11-17

- PR #3 remains open; it has not been merged or deployed.
- The branch is 65 commits ahead of `main` and 0 commits behind; the comparison reports 14 changed files. The long commit history is a reviewability consideration, not by itself a code defect.
- No submitted PR reviews or inline review threads were present at the latest check.
- GitHub Actions run #40 passed all 11 unit tests, lint, and production build on the preceding contrast-refinement commit (`2e3c5e0`). The later mobile touch-target change and documentation synchronization require a fresh CI result.
- Source review raised small secondary text to `text-neutral-400` and increased the mobile navigation toggle to 44 × 44 CSS pixels.
- Screen-reader testing and physical-device touch testing remain outstanding. Branch-specific browser verification still requires an approved deployment.
- The next gated milestone is human review and approval. Do not mark the PR ready, merge it, or deploy it without explicit approval.
- After an approved deployment, repeat browser checks for persistence, malformed saved data, storage write failures, responsive layout, keyboard behavior, and rendered contrast.

## Guiding Principle

> **A clearly scoped, working MVP is better than an unfinished promise of a larger platform.**

The current milestone is complete. Further development is optional, not an outstanding requirement.

---

Review date: 2026-11-17

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

## Follow-up Accessibility Refinement — 2026-11-17

- [x] Raise remaining small secondary text from `text-neutral-500` to `text-neutral-400` across the application and dashboard components.
- [x] Raise the custom section-label text color to the matching neutral value.
- [ ] Measure rendered contrast ratios for all text/background combinations at runtime.
- [x] Increase the mobile navigation toggle to a 44 × 44 CSS-pixel target; confirm mobile nav links and primary CTAs have padded hit areas.
- [ ] Complete NVDA/VoiceOver screen-reader checks and physical-device touch-target measurements.
- [ ] After explicit deployment approval, repeat browser checks against the updated PR branch.

The source-token adjustment improves contrast on the near-black interface, but it is not a claim of full WCAG conformance. Manual rendered verification remains outstanding.

Source inspection confirms the mobile menu toggle is 44 × 44 CSS pixels. This does not replace physical-device testing of spacing and touch behavior.
