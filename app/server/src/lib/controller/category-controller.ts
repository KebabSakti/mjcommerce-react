import CategoryModel from "../model/category-model";
import CategoryRepository from "../repository/category-repository";

const categoryRepository = new CategoryRepository();

export default class CategoryController {
  async getCategories(): Promise<CategoryModel[]> {
    const data = await categoryRepository.read();

    return data;
  }
}
