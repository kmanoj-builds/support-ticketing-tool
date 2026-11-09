import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/AppError.js";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof Error && error.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ticket ID",
    });
  }

  console.error("Unexpected server error:", error);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
