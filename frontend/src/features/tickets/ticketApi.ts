
import api from "../../lib/axios";

import type { Ticket } from "../../types/ticket";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  count?: number;
  data: T;
}

export type CreateTicketInput = Omit<
  Ticket,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateTicketInput = CreateTicketInput;

export const ticketApi = {
  // Fetch all tickets
  async getAll(): Promise<Ticket[]> {
    const response = await api.get<ApiResponse<Ticket[]>>(
      "/tickets",
    );

    return response.data.data;
  },

  // Fetch a single ticket
  async getById(id: string): Promise<Ticket> {
    const response = await api.get<ApiResponse<Ticket>>(
      `/tickets/${id}`,
    );

    return response.data.data;
  },

  // Create a ticket
  async create(input: CreateTicketInput): Promise<Ticket> {
    const response = await api.post<ApiResponse<Ticket>>(
      "/tickets",
      input,
    );

    return response.data.data;
  },

  // Update a ticket
  async update(
    id: string,
    input: UpdateTicketInput,
  ): Promise<Ticket> {
    const response = await api.put<ApiResponse<Ticket>>(
      `/tickets/${id}`,
      input,
    );

    return response.data.data;
  },

  // Delete a ticket
  async delete(id: string): Promise<void> {
    await api.delete(`/tickets/${id}`);
  },
};
