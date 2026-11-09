export type TicketStatus = "OPEN" | "IN_PROGRESS" | "CLOSED";

export type TicketPriority = "LOW" | "MEDIUM" | "HIGH";

export type TicketCategory = "TECHNICAL" | "PAYMENT" | "ACCOUNT" | "GENERAL";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  requesterName: string;
  category: TicketCategory;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
}