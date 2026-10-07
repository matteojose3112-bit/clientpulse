import { activities } from "../../data/activity";

function ActivityFeed() {
  return (
    <div className="pulse-card overflow-hidden">
      <div className="border-b border-white/10 p-6">
        <p className="pulse-section-label mb-3">Recent Activity</p>

        <h3 className="text-2xl font-medium tracking-[-0.03em]">
          Customer operations
        </h3>
      </div>

      <div className="divide-y divide-white/10">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex flex-col gap-4 p-6 transition hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-4">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-neutral-500" />

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                    {activity.type}
                  </span>

                  <span className="text-sm text-white">
                    {activity.customer}
                  </span>
                </div>

                <p className="mt-2 text-sm text-neutral-500">
                  {activity.description}
                </p>
              </div>
            </div>

            <span className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-neutral-700">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityFeed;