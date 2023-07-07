import express, { NextFunction, Request, Response } from "express";

import { AppError } from "@shared/errors/AppError";

import "express-async-errors";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.status(201).json({ ok: "ok" });
});

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `An Internal Server Error Has Occurred- ${err.message}`,
    });
  }
);

export { app };
