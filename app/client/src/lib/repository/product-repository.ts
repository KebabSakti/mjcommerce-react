import { Empty } from "../config/type";
import url from "../config/url";
import { Failure } from "../helper/failure";
import { urlParser } from "../helper/url-parser";
import { ProductModel } from "./../../../../lib/model/product-model";

export default class ProductRepository {
  async read(param: Record<string, any>): Promise<ProductModel[]> {
    const queryUrl = urlParser(url["product"], param);
    const response = await fetch(queryUrl);

    if (!response.ok) {
      throw Failure.network(response);
    }

    const json = await response.json();
    const data = json.map((e: ProductModel) => e);

    return data;
  }

  async show(id: string): Promise<ProductModel | Empty> {
    const queryUrl = urlParser(`${url["product"]}/${id}`);
    const response = await fetch(queryUrl);

    if (!response.ok) {
      throw Failure.network(response);
    }

    const json = await response.json();
    const data = json as ProductModel | Empty;

    return data;
  }
}
