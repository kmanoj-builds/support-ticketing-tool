
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Trash2,
  UserRound,
  RefreshCw,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import {
  selectTicketById,
  selectTicketFetching,
  selectTicketsUpdating,
  selectTicketsDeleting,
  selectTicketsError,
} from "../features/tickets/ticketsSelectors";

import {
  fetchTicketById,
  updateTicketAsync,
  deleteTicketAsync,
} from "../features/tickets/ticketsSlice";

import type {
  TicketPriority,
  TicketStatus,
} from "../types/ticket";

// ------------------------------------
// Styles
// ------------------------------------

const selectClass =
  "mt-1.5 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 disabled:cursor-not-allowed disabled:opacity-50";

// ------------------------------------
// Helpers
// ------------------------------------

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

// ------------------------------------
// Component
// ------------------------------------

export default function TicketDetailsPage() {
  const { ticketId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Redux state
  const ticket = useAppSelector((state) =>
    selectTicketById(state, ticketId ?? ""),
  );

  const fetchingOne = useAppSelector(selectTicketFetching);
  const updating = useAppSelector(selectTicketsUpdating);
  const deleting = useAppSelector(selectTicketsDeleting);
  const error = useAppSelector(selectTicketsError);

  // Local UI state
  const [actionError, setActionError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // ------------------------------------
  // Fetch ticket
  // ------------------------------------

  useEffect(() => {
    if (ticketId) {
      dispatch(fetchTicketById(ticketId));
    }
  }, [dispatch, ticketId]);

  // ------------------------------------
  // Update ticket
  // ------------------------------------

  async function handleUpdate(
    field: "status" | "priority",
    value: TicketStatus | TicketPriority,
  ) {
    if (!ticket || updating) return;

    const input = {
      title: ticket.title,
      description: ticket.description,
      requesterName: ticket.requesterName,
      category: ticket.category,

      status:
        field === "status"
          ? (value as TicketStatus)
          : ticket.status,

      priority:
        field === "priority"
          ? (value as TicketPriority)
          : ticket.priority,
    };

    setActionError(null);
    setSuccessMessage(null);

    try {
      await dispatch(
        updateTicketAsync({
          id: ticket.id,
          input,
        }),
      ).unwrap();

      setSuccessMessage(
        field === "status"
          ? "Ticket status updated successfully."
          : "Ticket priority updated successfully.",
      );
    } catch (err) {
      setActionError(
        typeof err === "string"
          ? err
          : "Unable to update ticket. Please try again.",
      );
    }
  }

  // ------------------------------------
  // Delete ticket
  // ------------------------------------

  async function handleDelete() {
    if (!ticket || deleting || updating) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ticket ${ticket.id}?`,
    );

    if (!confirmed) return;

    setActionError(null);

    try {
      await dispatch(deleteTicketAsync(ticket.id)).unwrap();

      navigate("/tickets");
    } catch (err) {
      setActionError(
        typeof err === "string"
          ? err
          : "Unable to delete ticket. Please try again.",
      );
    }
  }

  // ------------------------------------
  // Initial loading state
  // ------------------------------------

  if (fetchingOne && !ticket) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <div className="text-center">
          <RefreshCw
            size={24}
            className="mx-auto animate-spin text-brand-600"
          />

          <p className="mt-3 text-sm text-text-secondary">
            Loading ticket details...
          </p>
        </div>
      </div>
    );
  }

  // ------------------------------------
  // Ticket not found / API error
  // ------------------------------------

  if (!ticket) {
    return (
      <div className="rounded-xl border border-border bg-white px-6 py-16 text-center">
        <h1 className="text-xl font-semibold text-text-primary">
          {error ? "Unable to load ticket" : "Ticket not found"}
        </h1>

        <p className="mt-2 text-sm text-text-secondary">
          {error || "This ticket may have been deleted or does not exist."}
        </p>

        <div className="mt-5 flex justify-center gap-4">
          {error && (
            <button
              type="button"
              onClick={() => {
                if (ticketId) {
                  dispatch(fetchTicketById(ticketId));
                }
              }}
              disabled={fetchingOne}
              className="text-sm font-medium text-brand-600 hover:text-brand-700 disabled:opacity-50"
            >
              Retry
            </button>
          )}

          <Link
            to="/tickets"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            <ArrowLeft size={16} />
            Back to tickets
          </Link>
        </div>
      </div>
    );
  }

  // ------------------------------------
  // Main UI
  // ------------------------------------

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
          <p className="text-sm font-medium text-text-secondary">
            {ticket.id}
          </p>

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

      {/* Error message */}

      {actionError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {actionError}
        </div>
      )}

      {/* Success message */}

      {successMessage && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Ticket information */}

        <section className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-border bg-white p-5 sm:p-6">

            <h2 className="font-semibold text-text-primary">
              Ticket Information
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Requester */}

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

              {/* Category */}

              <div>
                <p className="text-xs font-medium text-text-secondary">
                  Category
                </p>

                <p className="mt-2 text-sm font-medium text-text-primary">
                  {ticket.category}
                </p>
              </div>

              {/* Created date */}

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

              {/* Updated date */}

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

            {/* Description */}

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

          <h2 className="font-semibold text-text-primary">
            Manage Ticket
          </h2>

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
              disabled={updating || deleting}
              onChange={(event) =>
                handleUpdate(
                  "status",
                  event.target.value as TicketStatus,
                )
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
              disabled={updating || deleting}
              onChange={(event) =>
                handleUpdate(
                  "priority",
                  event.target.value as TicketPriority,
                )
              }
              className={selectClass}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          {/* Updating indicator */}

          {updating && (
            <p className="mt-3 text-xs text-text-secondary">
              Saving changes...
            </p>
          )}

          {/* Delete */}

          <div className="mt-6 border-t border-border pt-5">
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting || updating}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 size={17} />

              {deleting ? "Deleting..." : "Delete Ticket"}
            </button>
          </div>

        </aside>

      </div>
    </div>
  );
}
