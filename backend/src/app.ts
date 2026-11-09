import express from "express";
import cors from "cors";

import ticketRoutes from "./routes/ticket.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// local check
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to ResolveDesk API",
  });
});

// health check
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

app.use("/api/tickets", ticketRoutes);

export default app;