import { Request, Response } from "express";
import Joi from "joi";
import { BadRequest, Failure } from "../helper/failure";
import UserOrderRepository from "../repository/user-order-repository";

const orderRepository = new UserOrderRepository();

export default class UserOrderController {
  async read(req: Request, res: Response) {
    try {
      const schema = Joi.object({
        page: Joi.string().required(),
        limit: Joi.string().required(),
      }).unknown(true);

      const { error } = schema.validate(req.query);

      if (error) {
        throw new BadRequest();
      }

      const user = req.app.locals.user;

      const param = {
        ...req.query,
        filter: req.query.filter ?? "userId",
        value: req.query.value ?? user.id,
      };

      const result = await orderRepository.read(param);

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }

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

  async update(req: Request, res: Response) {
    try {
      await orderRepository.update(req.body);

      res.end();
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }
}
