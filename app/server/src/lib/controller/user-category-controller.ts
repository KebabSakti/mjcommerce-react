import { Failure } from "../helper/failure";
import UserCategoryRepository from "../repository/user-category-repository";
import { Request, Response } from "express";

const categoryRepository = new UserCategoryRepository();

export default class UserCategoryController {
  async index(req: Request, res: Response) {
    try {
      const result = await categoryRepository.read();

      res
        .header({ Pagination: JSON.stringify(result.paginate) })
        .json(result.data);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }
}
