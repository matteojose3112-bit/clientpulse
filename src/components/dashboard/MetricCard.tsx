type MetricCardProps = {
  label: string;
  value: string;
  detail?: string;
};

function MetricCard({ label, value, detail }: MetricCardProps) {
  return (
    <article className="pulse-card group relative overflow-hidden p-6 md:p-8">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10 transition group-hover:bg-white/30" />

      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
        {label}
      </p>

      <p className="mt-6 text-5xl font-semibold tracking-[-0.05em] text-white">
        {value}
      </p>

      {detail && (
        <p className="mt-3 text-xs leading-5 text-neutral-600">
          {detail}
        </p>
      )}
    </article>
  );
}

export default MetricCard;