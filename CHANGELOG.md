# Changelog

All notable changes to ClientPulse are documented here.

ClientPulse is actively developing, so this changelog records the progression from the initial concept toward a functional customer-success operations platform.

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
* Added automatic score updates when customer health status changes
* Added live Portfolio Health metric based on customer health scores
* Added live customer counts for Total, Healthy, At Risk, and Critical accounts

### Improved

* Replaced static customer cards with reusable data-driven customer components
* Connected overview metrics to live application state
* Connected customer health controls to the customer data model
* Kept the MVP frontend-only and intentionally avoided unnecessary backend complexity

### Development

The project continues to follow the minimum-functional approach: build a useful feature, understand it, test it, and only then add another layer of complexity.

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
* Added automatically calculated customer metrics:

  * Total Customers
  * Healthy
  * At Risk
  * Critical
* Added initial responsive card-based interface

### Development

ClientPulse was started as a hands-on learning project using AI as a development and learning partner.

The initial objective is to build a minimum functional application first, understand how each part works, and progressively introduce more advanced functionality.

### Next

The next development stage will focus on customer-success workflow and risk intelligence, while keeping the application simple and functional.
