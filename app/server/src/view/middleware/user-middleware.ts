import { NextFunction, Request, Response } from "express";
import UserAuthController from "../../lib/controller/user-auth-controller";
import { Failure } from "../../lib/helper/failure";

const userAuthController = new UserAuthController();

export default async function userMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.headers.authorization;

    if (authorization != undefined) {
      const payloads = authorization.split(" ");

      if (payloads.length == 2) {
        const token = payloads[1];
        const userId = userAuthController.decrypt(token);
        req.app.locals.id = userId;
      }
    }

    return next();
  } catch (error: any) {
    Failure.handle(error, res);
  }
}
