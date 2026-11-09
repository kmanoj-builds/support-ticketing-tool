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

  update(id: string, data: TicketInput): Ticket | undefined {
    const index = tickets.findIndex((ticket) => ticket.id === id);

    if (index === -1) {
      return undefined;
    }

    const existingTicket = tickets[index];

    const updatedTicket: Ticket = {
      id,
      ...data,
      createdAt: existingTicket.createdAt,
      updatedAt: new Date().toISOString(),
    };

    tickets[index] = updatedTicket;

    return updatedTicket;
  },

  delete(id: string): boolean {
    const index = tickets.findIndex((ticket) => ticket.id === id);

    if (index === -1) {
      return false;
    }

    tickets.splice(index, 1);

    return true;
  },
};
