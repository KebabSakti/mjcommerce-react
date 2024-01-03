import express, { Request, Response } from "express";
import { Failure } from "../../../lib/helper/failure";

const router = express.Router();

router.get("/", async (_: Request, res: Response) => {
  try {
    res.status(200).json("AUTH API");
  } catch (error: any) {
    Failure.handle(error, res);
  }
});

export default router;
