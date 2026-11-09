import { z } from "zod";

export const ticketSchema = z.object({
  title: z.string().trim().min(5).max(120),

  description: z.string().trim().min(10).max(2000),

  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),

  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]),

  category: z.enum(["TECHNICAL", "PAYMENT", "ACCOUNT", "GENERAL"]),

  requesterName: z.string().trim().min(2).max(100),
});

export type TicketInput = z.infer<typeof ticketSchema>;