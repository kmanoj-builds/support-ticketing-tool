
import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";

// ------------------------------------
// Ticket selectors
// ------------------------------------

export const selectAllTickets = (state: RootState) =>
  state.tickets.items;

export const selectTicketById = (
  state: RootState,
  ticketId: string,
) =>
  state.tickets.items.find(
    (ticket) => ticket.id === ticketId,
  );

// ------------------------------------
// Dashboard statistics
// ------------------------------------

export const selectTicketStats = createSelector(
  [selectAllTickets],
  (tickets) => ({
    total: tickets.length,

    open: tickets.filter(
      (ticket) => ticket.status === "OPEN",
    ).length,

    inProgress: tickets.filter(
      (ticket) => ticket.status === "IN_PROGRESS",
    ).length,

    closed: tickets.filter(
      (ticket) => ticket.status === "CLOSED",
    ).length,
  }),
);

// ------------------------------------
// Loading selectors
// ------------------------------------

export const selectTicketsLoading = (state: RootState) =>
  state.tickets.fetching;

export const selectTicketsFetching = (state: RootState) =>
  state.tickets.fetching;

export const selectTicketFetching = (state: RootState) =>
  state.tickets.fetching;

export const selectTicketsCreating = (state: RootState) =>
  state.tickets.creating;

export const selectTicketsUpdating = (state: RootState) =>
  state.tickets.updating;

export const selectTicketsDeleting = (state: RootState) =>
  state.tickets.deleting;

// ------------------------------------
// Error selector
// ------------------------------------

export const selectTicketsError = (state: RootState) =>
  state.tickets.error;
