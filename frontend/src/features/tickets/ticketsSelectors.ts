
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export const selectAllTickets = (state: RootState) =>
  state.tickets.items;

export const selectTicketById = (
  state: RootState,
  ticketId: string
) =>
  state.tickets.items.find((ticket) => ticket.id === ticketId);

export const selectTicketStats = createSelector(
  [selectAllTickets],
  (tickets) => ({
    total: tickets.length,
    open: tickets.filter((ticket) => ticket.status === "OPEN").length,
    inProgress: tickets.filter(
      (ticket) => ticket.status === "IN_PROGRESS"
    ).length,
    closed: tickets.filter(
      (ticket) => ticket.status === "CLOSED"
    ).length,
  })
);
