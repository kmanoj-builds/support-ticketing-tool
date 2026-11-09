
import { randomUUID } from "node:crypto";

import type { Ticket } from "../types/ticket.js";
import type { TicketInput } from "../schemas/ticket.schema.js";

const tickets: Ticket[] = [];

export const ticketService = {
  // Create a ticket
  create(data: TicketInput): Ticket {
    const now = new Date().toISOString();

    const ticket: Ticket = {
      id: randomUUID(),
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    tickets.unshift(ticket);

    return ticket;
  },

  // Get all tickets
  getAll(): Ticket[] {
    return tickets;
  },

  // Get a ticket by ID
  getById(id: string): Ticket | undefined {
    return tickets.find((ticket) => ticket.id === id);
  },
};
