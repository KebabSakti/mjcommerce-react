import CategoryModel from "../model/category-model";
import CategoryRepository from "../repository/category-repository";

const category = new CategoryRepository();

export default class CategoryController {
  async read(): Promise<CategoryModel[]> {
    const data = await category.read();

    return data;
  }
}
