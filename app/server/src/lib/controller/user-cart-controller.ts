import { Request, Response } from "express";
import { Failure } from "../helper/failure";
import UserCartRepository from "../repository/user-cart-repository";

const cartRepository = new UserCartRepository();

export default class UserCartController {
  async show(req: Request, res: Response) {
    try {
      const userId = req.app.locals.userId;
      const result = await cartRepository.show({ userId: userId });

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userId = req.app.locals.userId;
      const param = { ...req.body, userId: userId };
      const result = await cartRepository.update(param);

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }
}
