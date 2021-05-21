import express from "express";

const router = express.Router();

router.get("/", (request: express.Request, response: express.Response) => {
  throw "test";
  response.send("Hello World");
});

export default router;
