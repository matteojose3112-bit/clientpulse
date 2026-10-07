import type { Customer } from "../../data/customers";

type RiskSummaryProps = {
  customers: Customer[];
};

function RiskSummary({ customers }: RiskSummaryProps) {
  const atRiskCustomers = customers.filter(
    (customer) => customer.health !== "Healthy",
  );

  const sortedCustomers = [...atRiskCustomers].sort(
    (a, b) => a.healthScore - b.healthScore,
  );

  return (
    <div className="pulse-card overflow-hidden">
      <div className="border-b border-white/10 p-6">
        <p className="pulse-section-label mb-3">Risk Monitor</p>

        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <h3 className="text-2xl font-medium tracking-[-0.03em]">
            Accounts needing attention.
          </h3>

          <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-600">
            {sortedCustomers.length} flagged
          </span>
        </div>
      </div>

      {sortedCustomers.length === 0 ? (
        <div className="p-6 text-sm text-neutral-500">
          No accounts currently require attention.
        </div>
      ) : (
        <div className="divide-y divide-white/10">
          {sortedCustomers.map((customer) => (
            <a
              key={customer.id}
              href={`#customer-${customer.id}`}
              className="flex flex-col gap-4 p-6 transition hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-medium text-white">
                  {customer.company}
                </p>

                <p className="mt-1 text-xs text-neutral-600">
                  {customer.nextAction}
                </p>
              </div>

              <div className="flex items-center gap-5">
                <span className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">
                  {customer.health}
                </span>

                <span className="text-lg font-medium text-white">
                  {customer.healthScore}
                </span>

                <span
                  className="text-neutral-600 transition group-hover:text-white"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default RiskSummary;



