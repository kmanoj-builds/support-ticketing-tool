import type { Request, Response } from "express";

import { ticketSchema } from "../schemas/ticket.schema.js";
import { ticketService } from "../services/ticket.service.js";

export const ticketController = {
  create(req: Request, res: Response) {
    const result = ticketSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const ticket = ticketService.create(result.data);

    return res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      data: ticket,
    });
  },

  getAll(_req: Request, res: Response) {
    const tickets = ticketService.getAll();

    return res.status(200).json({
      success: true,
      count: tickets.length,
      data: tickets,
    });
  },

  getById(req: Request<{ id: string }>, res: Response) {
    const ticket = ticketService.getById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: ticket,
    });
  },
};
