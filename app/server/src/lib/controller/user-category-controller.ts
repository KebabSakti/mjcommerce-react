import UserCategoryRepository from "../repository/user-category-repository";
import { CategoryModel } from "../../../../lib/model/category-model";

const categoryRepository = new UserCategoryRepository();

export default class UserCategoryController {
  async getCategories(): Promise<CategoryModel[]> {
    const data = await categoryRepository.read();

    return data;
  }
}
