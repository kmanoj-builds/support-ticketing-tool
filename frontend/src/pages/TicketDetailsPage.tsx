import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Trash2,
  UserRound,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import { selectTicketById } from "../features/tickets/ticketsSelectors";

import {
  deleteTicket,
  updateTicketPriority,
  updateTicketStatus,
} from "../features/tickets/ticketsSlice";

import type { TicketPriority, TicketStatus } from "../types/ticket";

const selectClass =
  "mt-1.5 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

function formatDate(date: string) {
  return new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusStyle(status: TicketStatus) {
  switch (status) {
    case "OPEN":
      return "bg-amber-50 text-amber-700";

    case "IN_PROGRESS":
      return "bg-blue-50 text-blue-700";

    case "CLOSED":
      return "bg-green-50 text-green-700";
  }
}

export default function TicketDetailsPage() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const ticket = useAppSelector((state) =>
    selectTicketById(state, ticketId ?? ""),
  );

  if (!ticket) {
    return (
      <div className="rounded-xl border border-border bg-white px-6 py-16 text-center">
        <h1 className="text-xl font-semibold text-text-primary">
          Ticket not found
        </h1>

        <p className="mt-2 text-sm text-text-secondary">
          This ticket may have been deleted or does not exist.
        </p>

        <Link
          to="/tickets"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          <ArrowLeft size={16} />
          Back to tickets
        </Link>
      </div>
    );
  }

  function handleStatusChange(status: TicketStatus) {
    dispatch(
      updateTicketStatus({
        id: ticket!.id,
        status,
      }),
    );
  }

  function handlePriorityChange(priority: TicketPriority) {
    dispatch(
      updateTicketPriority({
        id: ticket!.id,
        priority,
      }),
    );
  }

  function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete ticket ${ticket!.id}?`,
    );

    if (!confirmed) return;

    dispatch(deleteTicket(ticket!.id));
    navigate("/tickets");
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Back navigation */}
      <Link
        to="/tickets"
        className="inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-brand-600"
      >
        <ArrowLeft size={16} />
        Back to tickets
      </Link>

      {/* Heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">{ticket.id}</p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-text-primary">
            {ticket.title}
          </h1>

          <p className="mt-2 text-sm text-text-secondary">
            Review and manage this support request.
          </p>
        </div>

        <span
          className={`w-fit rounded-full px-3 py-1.5 text-xs font-medium ${getStatusStyle(ticket.status)}`}
        >
          {ticket.status.replace("_", " ")}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main ticket information */}
        <section className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
            <h2 className="font-semibold text-text-primary">
              Ticket Information
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-text-secondary">
                  Requester
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <UserRound size={17} className="text-slate-400" />
                  <p className="text-sm font-medium text-text-primary">
                    {ticket.requesterName}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-text-secondary">
                  Category
                </p>

                <p className="mt-2 text-sm font-medium text-text-primary">
                  {ticket.category}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-text-secondary">
                  Created At
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <CalendarDays size={17} className="text-slate-400" />
                  <p className="text-sm text-text-primary">
                    {formatDate(ticket.createdAt)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-text-secondary">
                  Last Updated
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <Clock3 size={17} className="text-slate-400" />
                  <p className="text-sm text-text-primary">
                    {formatDate(ticket.updatedAt)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <h3 className="text-sm font-semibold text-text-primary">
                Description
              </h3>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                {ticket.description}
              </p>
            </div>
          </div>
        </section>

        {/* Ticket management */}
        <aside className="h-fit rounded-xl border border-border bg-white p-5">
          <h2 className="font-semibold text-text-primary">Manage Ticket</h2>

          {/* Status */}
          <div className="mt-5">
            <label
              htmlFor="ticket-status"
              className="text-sm font-medium text-text-primary"
            >
              Status
            </label>

            <select
              id="ticket-status"
              value={ticket.status}
              onChange={(event) =>
                handleStatusChange(event.target.value as TicketStatus)
              }
              className={selectClass}
            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          {/* Priority */}
          <div className="mt-4">
            <label
              htmlFor="ticket-priority"
              className="text-sm font-medium text-text-primary"
            >
              Priority
            </label>

            <select
              id="ticket-priority"
              value={ticket.priority}
              onChange={(event) =>
                handlePriorityChange(event.target.value as TicketPriority)
              }
              className={selectClass}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          {/* Delete */}
          <div className="mt-6 border-t border-border pt-5">
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <Trash2 size={17} />
              Delete Ticket
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
