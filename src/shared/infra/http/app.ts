import express, { NextFunction, Request, Response } from "express";

import { AppError } from "@shared/errors/AppError";

import "express-async-errors";
import "reflect-metadata";

import { routes } from "./routes";

import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../../../swagger.json";
import cors from "cors";
import nocache from "nocache";

import "@shared/container";

const app = express();

app.use(nocache())

app.use(cors({
  origin: "*",
}));

app.use(morgan(":method :url :status - :response-time ms"));

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.use(express.static("public"));
app.use(express.static("upload"));

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
