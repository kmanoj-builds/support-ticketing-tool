import type { Ticket } from "../types/ticket";

export const mockTickets: Ticket[] = [
  {
    id: "TKT-1001",
    title: "Unable to login to account",
    description:
      "The user is unable to access their account despite entering the correct credentials.",
    requesterName: "Arun Kumar",
    category: "ACCOUNT",
    status: "OPEN",
    priority: "HIGH",
    createdAt: "2026-11-08T10:30:00Z",
    updatedAt: "2026-11-08T10:30:00Z",
  },
  {
    id: "TKT-1002",
    title: "Payment transaction failed",
    description: "The payment fails after clicking the confirmation button.",
    requesterName: "Priya",
    category: "PAYMENT",
    status: "IN_PROGRESS",
    priority: "HIGH",
    createdAt: "2026-11-08T12:00:00Z",
    updatedAt: "2026-11-09T08:00:00Z",
  },
  {
    id: "TKT-1003",
    title: "Dashboard loading slowly",
    description: "The dashboard takes more than 15 seconds to load.",
    requesterName: "Rahul",
    category: "TECHNICAL",
    status: "CLOSED",
    priority: "MEDIUM",
    createdAt: "2026-11-07T09:00:00Z",
    updatedAt: "2026-11-08T11:00:00Z",
  },
];