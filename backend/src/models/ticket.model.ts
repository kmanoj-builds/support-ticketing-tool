import { Schema, model } from "mongoose";

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    requesterName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["TECHNICAL", "PAYMENT", "ACCOUNT", "GENERAL"],
      required: true,
    },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      required: true,
    },

    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "CLOSED"],
      default: "OPEN",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        const result = ret as Record<string, unknown>;
        delete result._id;
        return result;
      },
    },
  },
);

ticketSchema.virtual("id").get(function () {
  return this._id.toString();
});

export const TicketModel = model("Ticket", ticketSchema);
