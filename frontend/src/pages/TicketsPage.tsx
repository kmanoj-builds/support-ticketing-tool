
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { Plus, Search, RefreshCw } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import {
  fetchTickets,
} from "../features/tickets/ticketsSlice";

import {
  selectAllTickets,
  selectTicketsLoading,
  selectTicketsError,
} from "../features/tickets/ticketsSelectors";

import TicketTable from "../components/tickets/TicketTable";

import type {
  TicketStatus,
  TicketPriority,
} from "../types/ticket";

type StatusFilter = "ALL" | TicketStatus;
type PriorityFilter = "ALL" | TicketPriority;

export default function TicketsPage() {
  const dispatch = useAppDispatch();

  // Redux state
  const tickets = useAppSelector(selectAllTickets);
  const loading = useAppSelector(selectTicketsLoading);
  const error = useAppSelector(selectTicketsError);

  // Local UI state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("ALL");
  const [priorityFilter, setPriorityFilter] =
    useState<PriorityFilter>("ALL");

  // Fetch tickets from the backend
  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  // Search and filter tickets
  const filteredTickets = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.title.toLowerCase().includes(searchTerm) ||
        ticket.id.toLowerCase().includes(searchTerm) ||
        ticket.requesterName.toLowerCase().includes(searchTerm);

      const matchesStatus =
        statusFilter === "ALL" ||
        ticket.status === statusFilter;

      const matchesPriority =
        priorityFilter === "ALL" ||
        ticket.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [tickets, search, statusFilter, priorityFilter]);

  const statusFilters: {
    label: string;
    value: StatusFilter;
  }[] = [
    { label: "All Tickets", value: "ALL" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  const priorityFilters: {
    label: string;
    value: PriorityFilter;
  }[] = [
    { label: "All Priorities", value: "ALL" },
    { label: "Low", value: "LOW" },
    { label: "Medium", value: "MEDIUM" },
    { label: "High", value: "HIGH" },
  ];

  // Initial loading state
  if (loading && tickets.length === 0) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <div className="text-center">
          <RefreshCw
            size={24}
            className="mx-auto animate-spin text-brand-600"
          />
          <p className="mt-3 text-sm text-text-secondary">
            Loading tickets...
          </p>
        </div>
      </div>
    );
  }

  // Initial error state
  if (error && tickets.length === 0) {
    return (
      <div className="flex min-h-75 flex-col items-center justify-center">
        <p className="text-sm text-red-600">{error}</p>

        <button
          type="button"
          onClick={() => dispatch(fetchTickets())}
          className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
            All Tickets
          </h1>

          <p className="mt-1 text-sm text-text-secondary">
            View, search, and manage all support requests.
          </p>
        </div>

        <Link
          to="/tickets/create"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700"
        >
          <Plus size={18} />
          Create Ticket
        </Link>
      </div>

      {/* API error while displaying existing data */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Search */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-white p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by ticket ID, title, or requester..."
            className="w-full rounded-lg border border-border bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <button
          type="button"
          onClick={() => dispatch(fetchTickets())}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Status filters */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
          Filter by status
        </p>

        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => {
            const isActive = statusFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setStatusFilter(filter.value)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-brand-600 text-white"
                    : "border border-border bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Priority filters */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
          Filter by priority
        </p>

        <div className="flex flex-wrap gap-2">
          {priorityFilters.map((filter) => {
            const isActive = priorityFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setPriorityFilter(filter.value)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-brand-600 text-white"
                    : "border border-border bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results information */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          Showing{" "}
          <span className="font-semibold text-text-primary">
            {filteredTickets.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-text-primary">
            {tickets.length}
          </span>{" "}
          tickets
        </p>

        {loading && (
          <span className="text-xs text-text-secondary">
            Refreshing...
          </span>
        )}
      </div>

      {/* Ticket table */}
      {filteredTickets.length > 0 ? (
        <TicketTable tickets={filteredTickets} />
      ) : (
        <div className="rounded-xl border border-border bg-white px-6 py-14 text-center">
          <h3 className="font-semibold text-text-primary">
            {tickets.length === 0
              ? "No tickets found"
              : "No matching tickets"}
          </h3>

          <p className="mt-2 text-sm text-text-secondary">
            {tickets.length === 0
              ? "Create your first support ticket to get started."
              : "Try changing your search or filter criteria."}
          </p>

          {tickets.length === 0 && (
            <Link
              to="/tickets/create"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              <Plus size={16} />
              Create Ticket
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
