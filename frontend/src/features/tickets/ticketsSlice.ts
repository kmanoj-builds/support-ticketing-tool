
import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";

import type { Ticket } from "../../types/ticket";

import {
  ticketApi,
  type CreateTicketInput,
  type UpdateTicketInput,
} from "./ticketApi";

// ------------------------------------
// State
// ------------------------------------

interface TicketsState {
  items: Ticket[];

  // Independent loading states
  fetching: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;

  error: string | null;
}

const initialState: TicketsState = {
  items: [],
  fetching: false,
  creating: false,
  updating: false,
  deleting: false,
  error: null,
};

// ------------------------------------
// Error helper
// ------------------------------------

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.message ||
      "Something went wrong while communicating with the server"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
};

// ------------------------------------
// Async Thunks
// ------------------------------------

export const fetchTickets = createAsyncThunk<
  Ticket[],
  void,
  { rejectValue: string }
>("tickets/fetchTickets", async (_, { rejectWithValue }) => {
  try {
    return await ticketApi.getAll();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchTicketById = createAsyncThunk<
  Ticket,
  string,
  { rejectValue: string }
>("tickets/fetchTicketById", async (id, { rejectWithValue }) => {
  try {
    return await ticketApi.getById(id);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const createTicketAsync = createAsyncThunk<
  Ticket,
  CreateTicketInput,
  { rejectValue: string }
>("tickets/createTicket", async (input, { rejectWithValue }) => {
  try {
    return await ticketApi.create(input);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateTicketAsync = createAsyncThunk<
  Ticket,
  { id: string; input: UpdateTicketInput },
  { rejectValue: string }
>("tickets/updateTicket", async ({ id, input }, { rejectWithValue }) => {
  try {
    return await ticketApi.update(id, input);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const deleteTicketAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("tickets/deleteTicket", async (id, { rejectWithValue }) => {
  try {
    await ticketApi.delete(id);
    return id;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ------------------------------------
// Slice
// ------------------------------------

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch all tickets
      .addCase(fetchTickets.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.fetching = false;
        state.items = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload ?? "Failed to fetch tickets";
      })

      // Fetch one ticket
      .addCase(fetchTicketById.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchTicketById.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (ticket) => ticket.id === action.payload.id,
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchTicketById.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to fetch ticket";
      })

      // Create ticket
      .addCase(createTicketAsync.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createTicketAsync.fulfilled, (state, action) => {
        state.creating = false;
        state.items.unshift(action.payload);
      })
      .addCase(createTicketAsync.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload ?? "Failed to create ticket";
      })

      // Update ticket
      .addCase(updateTicketAsync.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateTicketAsync.fulfilled, (state, action) => {
        state.updating = false;

        const index = state.items.findIndex(
          (ticket) => ticket.id === action.payload.id,
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateTicketAsync.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload ?? "Failed to update ticket";
      })

      // Delete ticket
      .addCase(deleteTicketAsync.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteTicketAsync.fulfilled, (state, action) => {
        state.deleting = false;

        state.items = state.items.filter(
          (ticket) => ticket.id !== action.payload,
        );
      })
      .addCase(deleteTicketAsync.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload ?? "Failed to delete ticket";
      });
  },
});

export default ticketsSlice.reducer;
