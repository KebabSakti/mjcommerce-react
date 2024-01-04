import { NextFunction, Request, Response } from "express";
import UserAuthController from "../../lib/controller/userAuthController";
import { Unauthorized } from "../../lib/helper/failure";

const userAuthController = new UserAuthController();

export default function userMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const payloads = req.headers.authorization?.split(" ");

  if (payloads != undefined) {
    const token = payloads[1];
    const authModel = userAuthController.decrypt(token);
    req.app.locals.auth = authModel;

    console.log(authModel);

    return next();
  }
}
