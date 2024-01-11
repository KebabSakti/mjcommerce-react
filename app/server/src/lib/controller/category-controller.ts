import { PaginationData } from "../config/type";
import CategoryModel from "../model/category-model";
import CategoryRepository from "../repository/category-repository";

const categoryRepository = new CategoryRepository();

export default class CategoryController {
  async getCategories(pagination?: PaginationData): Promise<CategoryModel[]> {
    const categories = await categoryRepository.getCategories(pagination);

    return categories;
  }
}
