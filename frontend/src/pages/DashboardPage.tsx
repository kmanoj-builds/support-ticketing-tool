import { Ticket, Inbox, Clock3, CheckCircle2, Plus } from "lucide-react";

import { Link } from "react-router";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import { fetchTickets } from "../features/tickets/ticketsSlice";

import {
  selectAllTickets,
  selectTicketStats,
  selectTicketsLoading,
  selectTicketsError,
} from "../features/tickets/ticketsSelectors";

import StatCard from "../components/dashboard/StatCard";
import RecentTickets from "../components/dashboard/RecentTickets";

export default function DashboardPage() {
  const dispatch = useAppDispatch();

  const tickets = useAppSelector(selectAllTickets);
  const stats = useAppSelector(selectTicketStats);
  const loading = useAppSelector(selectTicketsLoading);
  const error = useAppSelector(selectTicketsError);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const recentTickets = [...tickets]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  if (loading && tickets.length === 0) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  if (error && tickets.length === 0) {
    return (
      <div className="flex min-h-75 flex-col items-center justify-center gap-3">
        <p className="text-sm text-red-500">{error}</p>

        <button
          onClick={() => dispatch(fetchTickets())}
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-text-secondary">
            Monitor and manage your support requests.
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

      {/* Ticket Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Tickets"
          value={stats.total}
          icon={Ticket}
          iconColor="text-brand-600"
          iconBackground="bg-brand-50"
        />

        <StatCard
          title="Open Tickets"
          value={stats.open}
          icon={Inbox}
          iconColor="text-amber-600"
          iconBackground="bg-amber-50"
        />

        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={Clock3}
          iconColor="text-blue-600"
          iconBackground="bg-blue-50"
        />

        <StatCard
          title="Closed Tickets"
          value={stats.closed}
          icon={CheckCircle2}
          iconColor="text-green-600"
          iconBackground="bg-green-50"
        />
      </div>

      {/* Recent Tickets */}
      <RecentTickets tickets={recentTickets} />
    </div>
  );
}
