import { Link } from "react-router";
import type { Ticket } from "../../types/ticket";

interface TicketTableProps {
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

function getPriorityStyle(priority: Ticket["priority"]) {
  switch (priority) {
    case "HIGH":
      return "text-red-600";

    case "MEDIUM":
      return "text-amber-600";

    case "LOW":
      return "text-slate-500";
  }
}

export default function TicketTable({ tickets }: TicketTableProps) {
  if (tickets.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-white px-6 py-16 text-center">
        <h3 className="font-semibold text-text-primary">No tickets found</h3>
        <p className="mt-2 text-sm text-text-secondary">
          Try changing your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-187.5 text-left">
          <thead className="border-b border-border bg-slate-50">
            <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-4">Ticket</th>
              <th className="px-5 py-4">Requester</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Priority</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Created</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="transition hover:bg-slate-50">
                <td className="px-5 py-4">
                  <Link
                    to={`/tickets/${ticket.id}`}
                    className="font-medium text-text-primary hover:text-brand-600"
                  >
                    {ticket.title}
                  </Link>

                  <p className="mt-1 text-xs text-text-secondary">
                    {ticket.id}
                  </p>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {ticket.requesterName}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {ticket.category}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`text-xs font-semibold ${getPriorityStyle(ticket.priority)}`}
                  >
                    {ticket.priority}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(ticket.status)}`}
                  >
                    {ticket.status.replace("_", " ")}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-slate-500">
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
