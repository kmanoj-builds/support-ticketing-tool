import { Ticket, Inbox, Clock3, CheckCircle2, Plus } from "lucide-react";
import { Link } from "react-router";

import StatCard from "../components/dashboard/StatCard";
import RecentTickets from "../components/dashboard/RecentTickets";
import { mockTickets } from "../data/mockTickets";

export default function DashboardPage() {
  const totalTickets = mockTickets.length;

  const openTickets = mockTickets.filter(
    (ticket) => ticket.status === "OPEN",
  ).length;

  const inProgressTickets = mockTickets.filter(
    (ticket) => ticket.status === "IN_PROGRESS",
  ).length;

  const closedTickets = mockTickets.filter(
    (ticket) => ticket.status === "CLOSED",
  ).length;

  const recentTickets = [...mockTickets]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page heading */}
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

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Tickets"
          value={totalTickets}
          icon={Ticket}
          iconColor="text-brand-600"
          iconBackground="bg-brand-50"
        />

        <StatCard
          title="Open Tickets"
          value={openTickets}
          icon={Inbox}
          iconColor="text-amber-600"
          iconBackground="bg-amber-50"
        />

        <StatCard
          title="In Progress"
          value={inProgressTickets}
          icon={Clock3}
          iconColor="text-blue-600"
          iconBackground="bg-blue-50"
        />

        <StatCard
          title="Closed Tickets"
          value={closedTickets}
          icon={CheckCircle2}
          iconColor="text-green-600"
          iconBackground="bg-green-50"
        />
      </div>

      {/* Recent tickets */}
      <RecentTickets tickets={recentTickets} />
    </div>
  );
}
