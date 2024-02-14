import { Request, Response } from "express";
import { Failure } from "../helper/failure";
import UserOrderRepository from "../repository/user-order-repository";

const orderRepository = new UserOrderRepository();

export default class UserOrderController {
  async create(req: Request, res: Response) {
    try {
      const user = req.app.locals.user;
      const param = {
        ...req.body,
        userId: user.id,
        userName: user.name,
        userPhone: user.phone,
      };

      const result = await orderRepository.create(param);

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }
}
