import url from "../config/url";
import { Failure } from "../helper/failure";
import { urlParser } from "../helper/url-parser";
import { CategoryModel } from "./../../../../lib/model/category-model";

export default class CategoryRepository {
  async read(): Promise<CategoryModel[]> {
    const queryUrl = urlParser(url["category"]);
    const response = await fetch(queryUrl);

    if (!response.ok) {
      throw Failure.network(response);
    }

    const json = await response.json();
    const data = json.map((e: CategoryModel) => e);

    return data;
  }
}
