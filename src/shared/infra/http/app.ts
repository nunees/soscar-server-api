import express, { NextFunction, Request, Response } from "express";

import { AppError } from "@shared/errors/AppError";

import "express-async-errors";
import "reflect-metadata";

import { routes } from "./routes";

import "@shared/container";
import morgan from "morgan";

const app = express();
app.use(morgan(":method :url :status - :response-time ms"));
app.use(express.json());

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status_code: err.statusCode,
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `An Internal Server Error Has Occurred- ${err.message}`,
    });
  }
);

export { app };
