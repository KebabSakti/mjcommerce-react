import { NextFunction, Request, Response } from "express";
import { func } from "joi";

export default function userMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("USER MIDDLEWARE");
  next();
}
