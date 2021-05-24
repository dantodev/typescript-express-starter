import express from "express";
import { NotFoundError } from "../lib/errors";

const router = express.Router();

router.get("*", (request: express.Request) => {
  throw new NotFoundError(`unknown path ${request.url}`);
});

export default router;
