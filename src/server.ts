import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Router from "./lib/router";
import * as HelloWorld from "./api/hello-world";

export let app: express.Application;
export let router: Router;

function startApp() {
  loadEnv("../.env.local");
  loadEnv(`../.env.${process.env.NODE_ENV}`);
  loadEnv("../.env");

  app = express();
  router = new Router(app);
  registerRoutes();

  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server started at port ${process.env.SERVER_PORT}`);
  });
}

function registerRoutes() {
  router.registerRoute("get", "/", HelloWorld.home);
}

function loadEnv(envPath: string) {
  envPath = path.resolve(__dirname, envPath);
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
}

startApp();
