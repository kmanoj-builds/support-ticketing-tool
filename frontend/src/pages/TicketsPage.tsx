import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Plus, Search } from "lucide-react";

import { mockTickets } from "../data/mockTickets";
import TicketTable from "../components/tickets/TicketTable";
import type { TicketStatus } from "../types/ticket";

type StatusFilter = "ALL" | TicketStatus;

export default function TicketsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");

  const filteredTickets = useMemo(() => {
    return mockTickets.filter((ticket) => {
      const searchTerm = search.toLowerCase().trim();

      const matchesSearch =
        ticket.title.toLowerCase().includes(searchTerm) ||
        ticket.id.toLowerCase().includes(searchTerm) ||
        ticket.requesterName.toLowerCase().includes(searchTerm);

      const matchesStatus =
        statusFilter === "ALL" || ticket.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const filters: { label: string; value: StatusFilter }[] = [
    { label: "All Tickets", value: "ALL" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

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
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
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

      {/* Results information */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          Showing{" "}
          <span className="font-semibold text-text-primary">
            {filteredTickets.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-text-primary">
            {mockTickets.length}
          </span>{" "}
          tickets
        </p>
      </div>

      {/* Ticket table */}
      <TicketTable tickets={filteredTickets} />
    </div>
  );
}
