import type { Customer, CustomerHealth } from "../../data/customers";

type CustomerCardProps = {
  customer: Customer;
  onHealthChange: (id: number, health: CustomerHealth) => void;
};

const healthStyles: Record<CustomerHealth, string> = {
  Healthy: "border-white/10 text-neutral-400",
  "At Risk": "border-white/20 text-neutral-300",
  Critical: "border-white/40 text-white",
};

function CustomerCard({
  customer,
  onHealthChange,
}: CustomerCardProps) {
  return (
    <article
  id={`customer-${customer.id}`}
  className="pulse-card group p-6"
>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold tracking-[-0.02em] text-white">
            {customer.company}
          </h3>

          <p className="mt-1 text-sm text-neutral-500">
            {customer.name}
          </p>
        </div>

        <span
          className={`border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] ${healthStyles[customer.health]}`}
        >
          {customer.health}
        </span>
      </div>

      <div className="mt-8">
        <div className="flex items-end justify-between">
          <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
            Health score
          </span>

          <span className="text-2xl font-medium tracking-[-0.03em] text-white">
            {customer.healthScore}
          </span>
        </div>

        <div className="mt-3 h-1 overflow-hidden bg-white/10">
          <div
            className="h-full bg-white transition-all duration-500"
            style={{ width: `${customer.healthScore}%` }}
          />
        </div>
      </div>

      <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-neutral-600">
            Last contact
          </span>

          <span className="text-xs text-neutral-400">
            {customer.lastContact}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-neutral-600">
            Next action
          </span>

          <span className="text-right text-xs text-neutral-400">
            {customer.nextAction}
          </span>
        </div>
      </div>

      <div className="mt-6 border-t border-white/10 pt-5">
        <label
          htmlFor={`health-${customer.id}`}
          className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-600"
        >
          Update health
        </label>

        <select
          id={`health-${customer.id}`}
          value={customer.health}
          onChange={(event) =>
            onHealthChange(
              customer.id,
              event.target.value as CustomerHealth,
            )
          }
          className="w-full border border-white/10 bg-[#080808] px-3 py-2.5 text-xs text-neutral-300 outline-none transition hover:border-white/25 focus:border-white/40"
        >
          <option value="Healthy">Healthy</option>
          <option value="At Risk">At Risk</option>
          <option value="Critical">Critical</option>
        </select>
      </div>
    </article>
  );
}

export default CustomerCard;

