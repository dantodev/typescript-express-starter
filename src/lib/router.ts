import express from "express";

export default class Router {
  app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
  }

  registerRoute(method: string, path: string, callback: routeCallback): void {
    this.app.use(path, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
      if (request.method === method.toUpperCase()) {
        await callback({ request, response });
      }
      next();
    });
  }
}

export type routeObject = {
  request: express.Request;
  response: express.Response;
};

export type routeCallback = (routeObject: routeObject) => void;
