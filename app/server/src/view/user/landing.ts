import express, { Request, Response } from "express";
import { Failure } from "../../helper/failure";

const router = express.Router();

router.get("/", async (_: Request, res: Response) => {
  try {
    res.status(200).json("HELLO");
  } catch (error: any) {
    Failure.handle(error, res);
  }
});

export default router;
