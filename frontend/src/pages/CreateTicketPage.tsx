import { useState, type FormEvent } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import { createTicketAsync } from "../features/tickets/ticketsSlice";

import { selectTicketsCreating } from "../features/tickets/ticketsSelectors";

import type { TicketCategory, TicketPriority } from "../types/ticket";

import type { CreateTicketInput } from "../features/tickets/ticketApi";

const initialForm: CreateTicketInput = {
  requesterName: "",
  title: "",
  description: "",
  category: "TECHNICAL",
  priority: "MEDIUM",
  status: "OPEN",
};

const CreateTicketPage = () => {
  const dispatch = useAppDispatch();
 const loading = useAppSelector(selectTicketsCreating);

  const [formData, setFormData] = useState<CreateTicketInput>(initialForm);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: keyof CreateTicketInput, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setSuccess(false);

    try {
      await dispatch(createTicketAsync(formData)).unwrap();

      setFormData(initialForm);
      setSuccess(true);
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : "Unable to create ticket. Please try again.",
      );
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6 lg:p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Create Ticket
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a new support request and assign its priority.
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="font-semibold text-slate-900">Ticket Information</h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter the requester's details and describe the issue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Requester Name */}
          <div className="space-y-2">
            <label
              htmlFor="requesterName"
              className="text-sm font-medium text-slate-700"
            >
              Requester Name *
            </label>

            <input
              id="requesterName"
              type="text"
              required
              minLength={2}
              maxLength={100}
              value={formData.requesterName}
              onChange={(event) =>
                handleChange("requesterName", event.target.value)
              }
              placeholder="Enter employee name"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Ticket Title */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-slate-700"
            >
              Ticket Title *
            </label>

            <input
              id="title"
              type="text"
              required
              minLength={5}
              maxLength={120}
              value={formData.title}
              onChange={(event) => handleChange("title", event.target.value)}
              placeholder="Briefly describe the issue"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-slate-700"
            >
              Description *
            </label>

            <textarea
              id="description"
              required
              minLength={10}
              maxLength={2000}
              rows={5}
              value={formData.description}
              onChange={(event) =>
                handleChange("description", event.target.value)
              }
              placeholder="Provide detailed information about the issue..."
              className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Category and Priority */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-slate-700"
              >
                Category *
              </label>

              <select
                id="category"
                value={formData.category}
                onChange={(event) =>
                  handleChange("category", event.target.value as TicketCategory)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option value="TECHNICAL">Technical</option>
                <option value="PAYMENT">Payment</option>
                <option value="ACCOUNT">Account</option>
                <option value="GENERAL">General</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="priority"
                className="text-sm font-medium text-slate-700"
              >
                Priority *
              </label>

              <select
                id="priority"
                value={formData.priority}
                onChange={(event) =>
                  handleChange("priority", event.target.value as TicketPriority)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          {/* Default Status */}
          <div className="rounded-lg bg-slate-50 px-4 py-3">
            <p className="text-sm font-medium text-slate-700">Initial Status</p>

            <p className="mt-1 text-sm text-slate-500">
              New tickets are automatically created with OPEN status.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div
              role="status"
              className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              Ticket created successfully!
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end border-t border-slate-200 pt-5">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#294d78] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Ticket..." : "Create Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketPage;
