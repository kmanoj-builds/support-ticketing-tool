import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { mockTickets } from "../../data/mockTickets";
import type { Ticket, TicketPriority, TicketStatus } from "../../types/ticket";

interface TicketsState {
  items: Ticket[];
}

const initialState: TicketsState = {
  items: mockTickets,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addTicket(state, action: PayloadAction<Ticket>) {
      state.items.unshift(action.payload);
    },

    updateTicketStatus(
      state,
      action: PayloadAction<{
        id: string;
        status: TicketStatus;
      }>,
    ) {
      const ticket = state.items.find(
        (ticket) => ticket.id === action.payload.id,
      );

      if (ticket) {
        ticket.status = action.payload.status;
        ticket.updatedAt = new Date().toISOString();
      }
    },

    updateTicketPriority(
      state,
      action: PayloadAction<{
        id: string;
        priority: TicketPriority;
      }>,
    ) {
      const ticket = state.items.find(
        (ticket) => ticket.id === action.payload.id,
      );

      if (ticket) {
        ticket.priority = action.payload.priority;
        ticket.updatedAt = new Date().toISOString();
      }
    },

    deleteTicket(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (ticket) => ticket.id !== action.payload,
      );
    },
  },
});

export const {
  addTicket,
  updateTicketStatus,
  updateTicketPriority,
  deleteTicket,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
