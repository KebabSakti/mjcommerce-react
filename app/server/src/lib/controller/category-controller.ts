import CategoryRepository from "../repository/category-repository";
import { CategoryModel } from './../../../../lib/model/category-model';

const categoryRepository = new CategoryRepository();

export default class CategoryController {
  async getCategories(): Promise<CategoryModel[]> {
    const data = await categoryRepository.read();

    return data;
  }
}
