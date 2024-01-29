import { ProductRating } from "../../../../lib/model/product-rating";
import ProductRatingRepository from "../repository/product-rating-repository";

const productRatingRepository = new ProductRatingRepository();

export default class ProductRatingController {
  async getRating(
    productId: string,
    param: Record<string, any>
  ): Promise<ProductRating[]> {
    const data = await productRatingRepository.read(productId, param);

    return data;
  }
}
