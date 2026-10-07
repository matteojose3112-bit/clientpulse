export type ActivityType =
  | "Health Update"
  | "Follow-up"
  | "Renewal"
  | "Escalation";

export type Activity = {
  id: number;
  type: ActivityType;
  customer: string;
  description: string;
  time: string;
};

export const activities: Activity[] = [
  {
    id: 1,
    type: "Health Update",
    customer: "Vertex Systems",
    description: "Account moved to At Risk",
    time: "18 min ago",
  },
  {
    id: 2,
    type: "Follow-up",
    customer: "Northstar Labs",
    description: "Quarterly review scheduled",
    time: "1 hr ago",
  },
  {
    id: 3,
    type: "Escalation",
    customer: "Orbit Commerce",
    description: "Executive attention required",
    time: "3 hrs ago",
  },
  {
    id: 4,
    type: "Renewal",
    customer: "Summit Digital",
    description: "Renewal milestone approaching",
    time: "Yesterday",
  },
];