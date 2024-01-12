import { QueryOption } from "../config/type";
import CategoryModel from "../model/category-model";
import CategoryRepository from "../repository/category-repository";

const categoryRepository = new CategoryRepository();

export default class CategoryController {
  async getCategories(option?: QueryOption): Promise<CategoryModel[]> {
    const categories = await categoryRepository.read(option);

    return categories;
  }
}
