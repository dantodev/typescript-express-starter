import express from "express";
import { logError } from "./logger";

type ServerErrorObject = {
  name?: string;
  message?: string;
  status?: number;
};

export class ServerError extends Error {
  name: string;
  message: string;
  status: number;

  constructor({ name = null, message = null, status = null }: ServerErrorObject) {
    super(message || "a unknown error occurred");
    this.name = name || "ServerError";
    this.status = status || 500;
  }
}

export class NotFoundError extends ServerError {
  constructor(message: string = null) {
    super({
      name: "NotFoundError",
      message: message || "page not found",
      status: 404
    });
  }
}

export function handleError(error: Error | string, request: express.Request, response: express.Response): void {
  if (error instanceof Error) {
    logError(error.stack);
  } else {
    logError(`Error: ${error}`);
    error = new ServerError({ message: error });
  }

  let message = error instanceof ServerError ? error : error.message;
  let status = error instanceof ServerError ? error.status : 500;

  if (request.get("Accept").includes("application/json")) {
    response.status(status).json({ error: message });
  } else {
    response.status(status).send(message);
  }
}
