# Changelog

## [0.7.1] — Browser Storage Resilience — 2026-11-11

### Fixed
- Validate browser-restored customer records before using them in dashboard state.
- Reject malformed records, unsupported health statuses, invalid score ranges, duplicate customer IDs, non-positive IDs, and blank required text fields.
- Fall back to the bundled sample portfolio when saved data is invalid or cannot be read.
- Handle local-storage write failures without breaking dashboard interactions.

### Tests
- Extracted customer-storage validation and persistence into a small testable module.
- Added Node.js unit tests for valid and invalid records, supported health statuses, malformed JSON, non-array data, duplicate IDs, blank required fields, blocked storage reads, successful writes, and failed writes.
- Expanded the suite from 10 to 11 tests after review identified missing coverage for blank required fields and non-positive IDs.
- Added the unit-test command to CI ahead of lint and production build.

### Verification
- The earlier lint and production build passed before this test-suite change.
- GitHub Actions run #19 passed: the initial 10 unit tests, lint, and the production build completed successfully.
- The expanded 11-test suite and stricter validation changes are awaiting a fresh CI result.
- A live smoke test of the currently deployed GitHub Pages build verified rendering, all six sample customer cards, search, health filtering, and in-session status updates. No visible console errors, failed network requests, or broken assets were observed.
- On the deployed build, a health-status edit reverted after reload. PR #3 remains unmerged and its branch has not been deployed, so the new storage-validation and failure-handling behavior still needs branch-specific browser verification after an approved deployment.
- Malformed-storage and blocked-write browser scenarios remain unverified manually; those cases are covered by the automated unit tests.

### Notes
- Persistence remains best-effort and local to the current browser; no backend, backup, or cross-device sync was added.

---

All notable changes to ClientPulse are documented here.

---

## [0.6.0] — MVP Closeout & Maintenance Mode

### Added
- GitHub Actions CI for linting and production builds on pushes and pull requests to `main`
- Clear documentation of the frontend MVP's scope and limitations

### Improved
- Clarified that customer and activity records are illustrative sample data
- Documented browser-local persistence and its single-browser limitations
- Separated delivered MVP functionality from deferred backend, multi-user, CRM, workflow, automation, and analytics ideas
- Closed the current roadmap at the deployed frontend MVP milestone

### Release Status
- The frontend MVP remains deployed on GitHub Pages
- ClientPulse is now in maintenance mode
- Deferred roadmap ideas are optional future scope, not incomplete MVP requirements
- Manual browser, keyboard, and rendered-contrast checks remain unverified

---

## [0.5.0] — Interaction & Brand Polish

### Fixed

* Corrected the GitHub Pages favicon path so the Aster-inspired icon loads from the project site
* Aligned magnetic pointer movement and cursor-follow behavior with Aster
* Limited magnetic movement to explicitly tagged call-to-action elements instead of every form control
* Preserved native touch and coarse-pointer behavior

### Improved

* Refined dashboard copy around account health, risk, follow-up, and retention
* Added page theme and social-sharing metadata
* Improved page title and navigation wording

---

ClientPulse is actively developing, so this changelog records the progression from the initial concept toward a functional customer-success operations platform.

---

## [0.4.0] — Deployment & MVP Release

### Added

* Added GitHub Pages production deployment
* Added `gh-pages` deployment workflow
* Added Vite base-path configuration for the GitHub Pages project site
* Added production deployment scripts to `package.json`
* Published the current ClientPulse MVP at the project's GitHub Pages URL

### Improved

* Updated project documentation to reflect the deployed MVP
* Confirmed production TypeScript and Vite build succeeds
* Kept the application frontend-only while establishing a clean foundation for the next development phase

### Release Status

* ClientPulse MVP is live and usable as a frontend demonstration
* GitHub repository and deployed application are now aligned
* Next development focus: customer-success workflow functionality

---

## [0.3.0] — Functional MVP Polish

### Added

* Added customer search by name and company
* Added health-status filtering
* Added empty-state handling with filter reset
* Added persistent customer state using browser local storage
* Added RiskSummary component
* Added recent ActivityFeed component
* Added live portfolio health calculation
* Added live customer health counts
* Added automatic health-score recalculation when health status changes

### Improved

* Connected customer cards, filters, risk intelligence, activity, and overview metrics to the same application state
* Improved the customer section from a static display into an interactive operational workspace
* Preserved the intentionally frontend-only architecture for the MVP
* Maintained the Aster-inspired visual foundation without copying Aster's interaction effects

---

## [0.2.0] — Dashboard & Health Intelligence

### Added

* Added Aster-inspired visual foundation while keeping ClientPulse focused on its own product identity
* Added responsive dashboard structure
* Added reusable MetricCard component
* Added reusable CustomerCard component
* Added Recent Activity feed
* Added customer numeric health scores
* Added health-score progress visualization
* Added automatic score updates when health status changes
* Added live Portfolio Health metric based on customer health scores
* Added live customer counts for Total, Healthy, At Risk, and Critical accounts

### Improved

* Replaced static customer cards with reusable data-driven customer components
* Connected overview metrics to live application state
* Connected customer health controls to the customer data model
* Kept the MVP frontend-only and intentionally avoided unnecessary backend complexity

---

## [0.1.0] — Initial MVP Foundation

### Added

* Created ClientPulse GitHub repository
* Initialized React + TypeScript application with Vite
* Configured ESLint
* Created initial ClientPulse application interface
* Added customer TypeScript data model
* Added sample customer records
* Added customer information display
* Added customer health statuses:
  * Healthy
  * At Risk
  * Critical
* Added interactive health-status updates
* Added automatically calculated customer metrics
* Added initial responsive card-based interface

### Development

ClientPulse was started as a hands-on learning project using AI as a development and learning partner.

The initial objective was to build a minimum functional application first, understand how each part works, and progressively introduce more advanced functionality.

### Next

The next development stage will focus on deeper customer-success workflow and risk intelligence, followed by integrations and automation.

## [0.7.0] — Documentation synchronization — 2026-11-03

### Updated
- Refreshed the README and roadmap to reaffirm the deployed frontend-only MVP boundary.
- Reconfirmed that customer/activity data is illustrative and persistence is browser-local.
- Kept backend, multi-user, CRM, and automation concepts explicitly deferred rather than implying they are implemented.
