import { Router } from "express";

import { ticketController } from "../controllers/ticket.controller.js";

const router = Router();

router
  .route("/")
  .get(ticketController.getAll)
  .post(ticketController.create);

router
  .route("/:id")
  .get(ticketController.getById);

export default router;