export type CustomerHealth = "Healthy" | "At Risk" | "Critical";

export type Customer = {
  id: number;
  name: string;
  company: string;
  health: CustomerHealth;
  healthScore: number;
  lastContact: string;
  nextAction: string;
};

export const customers: Customer[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    company: "Northstar Labs",
    health: "Healthy",
    healthScore: 92,
    lastContact: "2 days ago",
    nextAction: "Quarterly review",
  },
  {
    id: 2,
    name: "Daniel Carter",
    company: "Vertex Systems",
    health: "At Risk",
    healthScore: 61,
    lastContact: "18 days ago",
    nextAction: "Schedule check-in",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    company: "Orbit Commerce",
    health: "Critical",
    healthScore: 34,
    lastContact: "24 days ago",
    nextAction: "Executive escalation",
  },
  {
    id: 4,
    name: "James Wilson",
    company: "Summit Digital",
    health: "Healthy",
    healthScore: 88,
    lastContact: "4 days ago",
    nextAction: "Monitor adoption",
  },
  {
    id: 5,
    name: "Olivia Bennett",
    company: "Apex Analytics",
    health: "Healthy",
    healthScore: 95,
    lastContact: "1 day ago",
    nextAction: "Expansion opportunity",
  },
  {
    id: 6,
    name: "Michael Chen",
    company: "Lumen Cloud",
    health: "At Risk",
    healthScore: 58,
    lastContact: "12 days ago",
    nextAction: "Review usage",
  },
];

