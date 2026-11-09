export type TicketPriority = "LOW" | "MEDIUM" | "HIGH";

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "CLOSED";

export type TicketCategory = "TECHNICAL" | "PAYMENT" | "ACCOUNT" | "GENERAL";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  category: TicketCategory;
  createdAt: string;
  updatedAt: string;
}