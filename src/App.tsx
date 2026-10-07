import { useEffect, useMemo, useState } from "react";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import MetricCard from "./components/dashboard/MetricCard";
import CustomerCard from "./components/dashboard/CustomerCard";
import ActivityFeed from "./components/dashboard/ActivityFeed";
import RiskSummary from "./components/dashboard/RiskSummary";

import { customers as initialCustomers } from "./data/customers";
import type { Customer, CustomerHealth } from "./data/customers";

const STORAGE_KEY = "clientpulse-customers";

type HealthFilter = "All" | CustomerHealth;

const healthScores: Record<CustomerHealth, number> = {
  Healthy: 85,
  "At Risk": 60,
  Critical: 30,
};

function loadCustomers(): Customer[] {
  try {
    const savedCustomers = localStorage.getItem(STORAGE_KEY);

    if (!savedCustomers) {
      return initialCustomers;
    }

    const parsedCustomers: unknown = JSON.parse(savedCustomers);

    if (!Array.isArray(parsedCustomers)) {
      return initialCustomers;
    }

    return parsedCustomers as Customer[];
  } catch {
    return initialCustomers;
  }
}

function App() {
  const [customers, setCustomers] = useState<Customer[]>(loadCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [healthFilter, setHealthFilter] =
    useState<HealthFilter>("All");

  /*
   * Persist customer changes locally so health updates survive
   * a page refresh.
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
  }, [customers]);

  /*
   * Update a customer's health and automatically update
   * the corresponding health score.
   */
  const updateHealth = (
    id: number,
    health: CustomerHealth,
  ) => {
    setCustomers((currentCustomers) =>
      currentCustomers.map((customer) =>
        customer.id === id
          ? {
              ...customer,
              health,
              healthScore: healthScores[health],
            }
          : customer,
      ),
    );
  };

  /*
   * Portfolio metrics.
   */
  const totalCustomers = customers.length;

  const healthyCustomers = customers.filter(
    (customer) => customer.health === "Healthy",
  ).length;

  const atRiskCustomers = customers.filter(
    (customer) => customer.health === "At Risk",
  ).length;

  const criticalCustomers = customers.filter(
    (customer) => customer.health === "Critical",
  ).length;

  const portfolioHealth =
    totalCustomers > 0
      ? Math.round(
          customers.reduce(
            (total, customer) =>
              total + customer.healthScore,
            0,
          ) / totalCustomers,
        )
      : 0;

  /*
   * Search and health filtering.
   */
  const filteredCustomers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesSearch =
        query === "" ||
        customer.name.toLowerCase().includes(query) ||
        customer.company.toLowerCase().includes(query);

      const matchesHealth =
        healthFilter === "All" ||
        customer.health === healthFilter;

      return matchesSearch && matchesHealth;
    });
  }, [customers, searchQuery, healthFilter]);

  /*
   * Section reveal animation.
   */
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main section[id]",
      ),
    );

    sections.forEach((section) => {
      section.classList.add("pulse-scroll-reveal");
    });

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      sections.forEach((section) => {
        section.classList.add("is-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black"
    >
      <Navbar />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-black"
      >
        Skip to content
      </a>

      {/* =====================================================
          HERO / DASHBOARD INTRO
      ====================================================== */}
      <section
        id="dashboard"
        className="relative min-h-screen overflow-hidden px-6 pb-20 pt-28 lg:px-10"
      >
        <div
          className="pulse-grid absolute inset-0 opacity-60"
          aria-hidden="true"
        />

        <div
          className="pulse-glow right-[-220px] top-[12%]"
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-7xl">
          <div className="pulse-reveal max-w-6xl">
            <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs uppercase tracking-[0.2em] text-neutral-500">
              <span className="flex items-center gap-3">
                <span
                  className="pulse-status-dot"
                  aria-hidden="true"
                />
                Customer operations platform
              </span>

              <span className="hidden text-neutral-700 sm:inline">
                /
              </span>

              <span>
                Health · Automation · Retention
              </span>
            </div>

            <p className="pulse-section-label mb-7">
              Customer Success × Data × Systems
            </p>

            <h1 className="max-w-6xl text-[clamp(3.8rem,9vw,9rem)] font-semibold leading-[0.86] tracking-[-0.065em] text-white">
              ClientPulse
              <span className="text-neutral-600">.</span>
            </h1>

            <div className="mt-10 max-w-4xl">
              <h2 className="text-3xl font-medium leading-tight tracking-[-0.035em] text-neutral-200 md:text-5xl lg:text-6xl">
                Turn customer signals into{" "}
                <span className="text-white">
                  clear actions, healthier accounts,
                  and smarter retention.
                </span>
              </h2>
            </div>

            <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="max-w-2xl text-base leading-7 text-neutral-500 md:text-lg">
                  A customer-success operations workspace
                  for monitoring account health, identifying
                  risk, organizing follow-up, and turning
                  customer data into operational decisions.
                </p>

                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                  <span>CRM</span>
                  <span>Health Scoring</span>
                  <span>Automation</span>
                  <span>APIs</span>
                  <span>SQL</span>
                  <span>Analytics</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#customers"
                  className="pulse-button pulse-button-primary"
                >
                  View customers
                  <span aria-hidden="true">↘</span>
                </a>

                <a
                  href="#overview"
                  className="pulse-button pulse-button-secondary"
                >
                  View overview
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-20 flex items-center justify-between border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.2em] text-neutral-600">
            <span>01 / ClientPulse</span>

            <a
              href="#overview"
              className="transition hover:text-neutral-300"
            >
              Explore dashboard ↓
            </a>

            <span className="hidden sm:inline">
              MVP / 2026
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          OVERVIEW
      ====================================================== */}
      <section
        id="overview"
        className="relative px-6 py-24 lg:px-10"
      >
        <div className="mx-auto w-full max-w-7xl">
          <p className="pulse-section-label mb-6">
            Overview
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <MetricCard
              label="Portfolio Health"
              value={String(portfolioHealth)}
              detail="Average customer health score"
            />

            <MetricCard
              label="Total Customers"
              value={String(totalCustomers)}
              detail="Active customer accounts"
            />

            <MetricCard
              label="Healthy"
              value={String(healthyCustomers)}
              detail="Currently healthy"
            />

            <MetricCard
              label="At Risk"
              value={String(atRiskCustomers)}
              detail="Requires follow-up"
            />

            <MetricCard
              label="Critical"
              value={String(criticalCustomers)}
              detail="Immediate attention"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          RISK SUMMARY
      ====================================================== */}
      <section
        id="risk"
        className="relative px-6 py-24 lg:px-10"
      >
        <div className="mx-auto w-full max-w-7xl">
          <RiskSummary customers={customers} />
        </div>
      </section>

      {/* =====================================================
          CUSTOMER HEALTH
      ====================================================== */}
      <section
        id="customers"
        className="relative px-6 py-24 lg:px-10"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-6 md:flex-row md:items-end">
            <div>
              <p className="pulse-section-label mb-5">
                Customer Health
              </p>

              <h2 className="text-3xl font-medium tracking-[-0.035em] md:text-5xl">
                Customer accounts.
              </h2>
            </div>

            <span className="text-xs uppercase tracking-[0.16em] text-neutral-600">
              {filteredCustomers.length} of{" "}
              {totalCustomers} accounts
            </span>
          </div>

          {/* Search + filter */}
          <div className="mt-8 grid gap-3 md:grid-cols-[1fr_auto]">
            <label className="block">
              <span className="sr-only">
                Search customers
              </span>

              <input
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search customers or companies..."
                className="w-full border border-white/10 bg-[#080808] px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-700 hover:border-white/20 focus:border-white/40"
              />
            </label>

            <label className="block">
              <span className="sr-only">
                Filter customers by health
              </span>

              <select
                value={healthFilter}
                onChange={(event) =>
                  setHealthFilter(
                    event.target.value as HealthFilter,
                  )
                }
                className="w-full border border-white/10 bg-[#080808] px-4 py-3 text-sm text-neutral-300 outline-none transition hover:border-white/20 focus:border-white/40 md:min-w-[180px]"
              >
                <option value="All">
                  All health statuses
                </option>

                <option value="Healthy">
                  Healthy
                </option>

                <option value="At Risk">
                  At Risk
                </option>

                <option value="Critical">
                  Critical
                </option>
              </select>
            </label>
          </div>

          {/* Customer results */}
          {filteredCustomers.length === 0 ? (
            <div className="pulse-card mt-8 p-10 text-center">
              <p className="text-sm text-neutral-500">
                No customers match your search or health
                filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setHealthFilter("All");
                }}
                className="mt-4 text-xs uppercase tracking-[0.14em] text-neutral-400 transition hover:text-white"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCustomers.map((customer) => (
                <CustomerCard
                  key={customer.id}
                  customer={customer}
                  onHealthChange={updateHealth}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          ACTIVITY
      ====================================================== */}
      <section
        id="activity"
        className="relative px-6 py-24 lg:px-10"
      >
        <div className="mx-auto w-full max-w-7xl">
          <ActivityFeed />
        </div>
      </section>
    </main>
  );
}

export default App;




