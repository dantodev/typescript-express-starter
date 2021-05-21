import express from "express";
import { NotFoundError } from "../lib/errors";

const router = express.Router();

router.get("*", () => {
  throw new NotFoundError();
});

export default router;
