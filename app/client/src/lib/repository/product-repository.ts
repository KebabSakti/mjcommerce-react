import { Result } from "../config/type";
import { url } from "../config/url";
import { urlParser } from "../helper/common";
import { Failure } from "../helper/failure";
import { ProductModel } from "./../../../../lib/model/product-model";

export default class ProductRepository {
  async read(param: Record<string, any>): Promise<Result<ProductModel[]>> {
    const queryUrl = urlParser(url.product, param);
    const response = await fetch(queryUrl);

    if (!response.ok) {
      throw Failure.network(response);
    }

    const data = await response.json();

    return data;
  }

  async show(id: string): Promise<Result<ProductModel>> {
    const queryUrl = urlParser(`${url.product}/${id}`);
    const response = await fetch(queryUrl);

    if (!response.ok) {
      throw Failure.network(response);
    }

    const data = await response.json();

    return data;
  }
}
