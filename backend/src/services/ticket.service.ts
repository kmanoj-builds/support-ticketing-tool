import { TicketModel } from "../models/ticket.model.js";
import type { Ticket } from "../types/ticket.js";
import type { TicketInput } from "../schemas/ticket.schema.js";

export const ticketService = {
  // Create a new ticket
  async create(input: TicketInput): Promise<Ticket> {
    const ticket = await TicketModel.create(input);

    return ticket.toJSON() as unknown as Ticket;
  },

  // Get all tickets
  async getAll(): Promise<Ticket[]> {
    const tickets = await TicketModel.find().sort({ createdAt: -1 }).exec();

    return tickets.map((ticket) => ticket.toJSON() as unknown as Ticket);
  },

  // Get a ticket by ID
  async getById(id: string): Promise<Ticket | null> {
    const ticket = await TicketModel.findById(id);

    return ticket ? (ticket.toJSON() as unknown as Ticket) : null;
  },

  // Update a ticket
  async update(id: string, input: TicketInput): Promise<Ticket | null> {
    const ticket = await TicketModel.findByIdAndUpdate(id, input, {
      new: true,
      runValidators: true,
    });

    return ticket ? (ticket.toJSON() as unknown as Ticket) : null;
  },

  // Delete a ticket
  async delete(id: string): Promise<boolean> {
    const ticket = await TicketModel.findByIdAndDelete(id);

    return ticket !== null;
  },
};
