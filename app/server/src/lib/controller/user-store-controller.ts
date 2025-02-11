import { Request, Response } from "express";
import { Failure } from "../helper/failure";
import UserStoreRepository from "../repository/user-store-repository";
import { convertToValidPhoneNumber } from "../helper/common";

const storeRepository = new UserStoreRepository();

export default class UserStoreController {
  async show(req: Request, res: Response) {
    try {
      const user = req.app.locals.user;
      const result = await storeRepository.show({ userId: user.id });

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const user = req.app.locals.user;
      req.body.phone = convertToValidPhoneNumber(req.body.phone);
      const payload = { ...req.body, userId: user.id };
      await storeRepository.create(payload);

      res.end();
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const user = req.app.locals.user;
      req.body.phone = convertToValidPhoneNumber(req.body.phone);
      const payload = { ...req.body, userId: user.id };
      await storeRepository.update(payload);

      res.end();
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }
}
