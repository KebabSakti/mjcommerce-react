import url from "../config/url";
import HTTP from "../helper/http";
import { CategoryModel } from './../../../../lib/model/category-model';

export default class CategoryRepository {
  async read(): Promise<CategoryModel[]> {
    const response = await HTTP.get(url["category"]);
    const json = await response.json();
    const data = json.map((e: CategoryModel) => e);

    return data;
  }
}
