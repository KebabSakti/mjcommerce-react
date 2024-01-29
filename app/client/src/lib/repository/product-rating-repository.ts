import { ProductRating } from "../../../../lib/model/product-rating";
import url from "../config/url";
import HTTP from "../helper/http";

export default class ProductRatingRepository {
  async read(
    productId: string,
    param: Record<string, any>
  ): Promise<ProductRating[]> {
    const response = await HTTP.get(url["productRating"], {
      query: { ...param, productId: productId },
    });

    const json = await response.json();
    const data = json.map((e: ProductRating) => e);

    return data;
  }
}
