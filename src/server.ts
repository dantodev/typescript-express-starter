import express from "express";
import homeApi from "./api/home-api";
import fallbackApi from "./api/fallback-api";
import { initEnvLoader } from "./lib/env-loader";
import { handleError } from "./lib/errors";
import { name, version } from "../package.json";

export let app: express.Application;

function startApp() {
  console.log(`starting ${name} v${version}`);

  initEnvLoader();

  app = express();
  registerRoutes();

  app.use((error: Error, request: express.Request, response: express.Response, next: express.NextFunction) => {
    handleError(error, request, response);
    next();
  });

  app.listen(process.env.SERVER_PORT, () => {
    console.log(`server started at port ${process.env.SERVER_PORT}`);
  });
}

function registerRoutes() {
  app.use(homeApi);
  app.use(fallbackApi);
}

startApp();
