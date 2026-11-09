import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import type { Ticket } from "../../types/ticket";

interface RecentTicketsProps {
  tickets: Ticket[];
}

function getStatusStyle(status: Ticket["status"]) {
  switch (status) {
    case "OPEN":
      return "bg-amber-50 text-amber-700";

    case "IN_PROGRESS":
      return "bg-blue-50 text-blue-700";

    case "CLOSED":
      return "bg-green-50 text-green-700";
  }
}

export default function RecentTickets({
  tickets,
}: RecentTicketsProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-white">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="font-semibold text-text-primary">
            Recent Tickets
          </h2>
          <p className="mt-1 text-xs text-text-secondary">
            Latest support requests
          </p>
        </div>

        <Link
          to="/tickets"
          className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          View all
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="divide-y divide-border">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="flex flex-col gap-3 px-5 py-4 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-text-primary">
                {ticket.title}
              </p>

              <p className="mt-1 text-xs text-text-secondary">
                {ticket.id} · {ticket.requesterName}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(ticket.status)}`}
              >
                {ticket.status.replace("_", " ")}
              </span>

              <span className="text-xs text-text-secondary">
                {ticket.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}