# ClientPulse

A customer-success portfolio dashboard built through hands-on software development and AI-assisted learning.

ClientPulse demonstrates how a customer-success team could review account health, identify accounts that may need attention, and prioritize follow-up conversations.

## Current Status

**Functional frontend MVP complete · Maintenance mode**

ClientPulse is a deployed, frontend-only MVP. It demonstrates an account portfolio, editable health status, health-score calculations, search and filtering, risk summaries, a sample activity feed, and browser-local persistence.

**Live application:** https://matteojose3112-bit.github.io/clientpulse/

The MVP is intentionally limited to a single browser experience with sample data. It is not a production CRM or a multi-user customer-success system.

## Current Features

- Sample customer portfolio with reusable account cards
- Customer and company details
- Editable Healthy, At Risk, and Critical statuses
- Health scores and score visualization
- Status-based health-score updates
- Portfolio health calculation and account counts
- Customer search by name or company
- Health-status filtering and clear-filter empty state
- Risk summary ordered by health score
- Static sample activity feed
- Browser local-storage persistence for customer changes
- Runtime validation of restored customer records, including required fields, health values, score bounds, and unique IDs
- Graceful fallback when browser storage is malformed, unavailable, or write-protected
- Responsive dashboard interface
- Reusable React components and TypeScript data modeling
- GitHub Pages deployment
- Focused Node.js unit tests for customer-storage validation and failure handling (`npm test`)
- GitHub Actions CI for unit tests, linting, and production builds

## Scope and Limitations

- Customer and activity records are illustrative sample data, not live customer records.
- Customer changes are stored in the current browser's local storage. They do not sync across devices or users and are not backed by a server.
- The activity feed is static sample content; it is not generated from customer actions.
- Health scores are demonstration values associated with status changes, not a validated predictive model.
- There is no authentication, database, API, CRM integration, task-management workflow, notification service, or automated risk detection.
- Do not enter real customer, confidential, or sensitive information.

These limitations are deliberate boundaries of the completed frontend MVP, not claims of unfinished production functionality.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- GitHub Actions
- GitHub Pages

## Project Goal

ClientPulse was built as a practical learning project to explore frontend development, component architecture, TypeScript data modeling, application state, business logic, and deployment.

The project follows:

**Learn → Build → Test → Understand → Improve**

## Project Documentation

- [Roadmap](ROADMAP.md)
- [Changelog](CHANGELOG.md)

## Author

**Matteo Jose**

Building practical software through hands-on learning, experimentation, and AI-assisted development.

## Maintenance update — 2026-11-11

The storage boundary now validates saved customer records before they enter application state. Invalid or duplicate records fall back to the bundled sample portfolio, and storage read/write failures do not prevent the dashboard from rendering. Ten focused Node.js tests pass in GitHub Actions, alongside lint and the production build. A browser smoke test of the currently deployed GitHub Pages version confirmed that the dashboard, customer list, search, filters, and in-session health updates work without visible console or network errors. The deployed version did not retain a health edit after reload; because PR #3 is still unmerged and has not been deployed, its updated storage behavior has not yet been verified in the live site. Persistence remains browser-local and best-effort; this does not add server-side backup or multi-user synchronization.

## Documentation review — 2026-11-03

Documentation review — 2026-11-03: ClientPulse remains a deployed, frontend-only MVP in maintenance mode. Its customer records and activity feed are illustrative; edits persist only in the current browser. No backend, authentication, multi-user sync, CRM integration, or automated risk prediction is claimed. Deferred ideas remain optional.
