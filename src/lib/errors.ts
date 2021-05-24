import express from "express";
import { logError } from "./logger";

type ServerErrorObject = {
  name?: string;
  message?: string;
  status?: number;
  logTrace?: boolean;
};

export class ServerError extends Error {
  name: string;
  message: string;
  status: number;
  logTrace: boolean;

  constructor({ name = null, message = null, status = null, logTrace = true }: ServerErrorObject = {}) {
    super(message || "a unknown error occurred");
    this.name = name || "ServerError";
    this.status = status || 500;
    this.logTrace = logTrace;

    // Set the prototype explicitly because of https://github.com/microsoft/TypeScript/issues/13965
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends ServerError {
  constructor(message: string = null) {
    super({
      name: "NotFoundError",
      message: message || "page not found",
      status: 404,
      logTrace: false
    });
  }
}

export function handleError(error: Error | string, request: express.Request, response: express.Response): void {
  let serverError: ServerError;

  if (error instanceof ServerError) {
    serverError = error;
  } else {
    if (error instanceof Error) {
      serverError = new ServerError({ name: error.name, message: error.message });
    } else {
      serverError = new ServerError({ message: error });
    }
  }

  if (serverError.logTrace) {
    logError(serverError.stack);
  } else {
    logError(`${serverError.name}: ${serverError.message}`);
  }

  if (request.get("Accept").includes("application/json")) {
    response.status(serverError.status).json({ error: serverError.message });
  } else {
    response.status(serverError.status).send(serverError.message);
  }
}
