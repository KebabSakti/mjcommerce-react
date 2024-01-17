import { RepositoryData } from "../config/type";
import url from "../config/url";
import HTTP from "../helper/http";
import CategoryModel from "../model/category-model";

export default class CategoryRepository {
  async read(parameter?: RepositoryData): Promise<CategoryModel[]> {
    const response = await HTTP.get(url["category"], {
      token: parameter?.token,
      query: { ...parameter?.paginate, ...parameter?.sorting },
    });

    const json = await response.json();
    const datas = json.map((e: CategoryModel) => e);

    return datas;
  }
}
