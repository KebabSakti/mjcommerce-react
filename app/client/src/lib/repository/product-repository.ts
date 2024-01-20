import { HttpRequest } from "../config/type";
import url from "../config/url";
import HTTP from "../helper/http";
import { ProductModel, ProductReadParameter } from "../model/product-model";

export default class ProductRepository {
  async read(param: ProductReadParameter): Promise<ProductModel[]> {
    const request: HttpRequest = {
      query: {
        ...param.paginate,
        ...param.filter,
        ...param.sort,
      },
    };

    const response = await HTTP.get(url["product"], request);
    const json = await response.json();
    const data = json.map((e: ProductModel) => e);

    return data;
  }
}
