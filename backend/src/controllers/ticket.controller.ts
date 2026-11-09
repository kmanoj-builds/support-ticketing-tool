import type { Request, Response, NextFunction } from "express";
import { ticketService } from "../services/ticket.service.js";
import { ticketSchema } from "../schemas/ticket.schema.js";
import { AppError } from "../utils/AppError.js";

export const ticketController = {
  // POST /api/tickets
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = ticketSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: result.error.flatten(),
        });
      }

      const ticket = await ticketService.create(result.data);

      return res.status(201).json({
        success: true,
        message: "Ticket created successfully",
        data: ticket,
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/tickets
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const tickets = await ticketService.getAll();

      return res.status(200).json({
        success: true,
        count: tickets.length,
        data: tickets,
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/tickets/:id
  async getById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const ticket = await ticketService.getById(req.params.id);

      if (!ticket) {
        throw new AppError(404, "Ticket not found");
      }

      return res.status(200).json({
        success: true,
        data: ticket,
      });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/tickets/:id
  async update(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = ticketSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: result.error.flatten(),
        });
      }

      const ticket = await ticketService.update(req.params.id, result.data);

      if (!ticket) {
        throw new AppError(404, "Ticket not found");
      }

      return res.status(200).json({
        success: true,
        message: "Ticket updated successfully",
        data: ticket,
      });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/tickets/:id
  async delete(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const deleted = await ticketService.delete(req.params.id);

      if (!deleted) {
        throw new AppError(404, "Ticket not found");
      }

      return res.status(200).json({
        success: true,
        message: "Ticket deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
