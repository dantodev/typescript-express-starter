import express from "express";

const router = express.Router();

router.get("/", (request: express.Request, response: express.Response) => {
  if (request.query.name) {
    response.send(`Hello ${request.query.name}`);
  } else if (typeof request.body === "object" && request.body.hasOwnProperty("name")) {
    response.send(`Hello ${request.body.name}`);
  } else {
    response.send("Hello World");
  }
});

export default router;
