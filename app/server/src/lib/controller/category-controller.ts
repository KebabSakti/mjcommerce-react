import CategoryModel from "../model/category-model";
import CategoryRepository from "../repository/category-repository";
import { ControllerData, Empty } from './../config/type';

const categoryRepository = new CategoryRepository();

export default class CategoryController {
  async getCategories(parameter?: ControllerData | Empty): Promise<CategoryModel[]> {
    const categories = await categoryRepository.read(parameter);

    return categories;
  }
}
