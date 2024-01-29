import { ProductRating } from "../../../../lib/model/product-rating";
import UserProductRatingRepository from "../repository/user-product-rating-repository";

const productRatingRepository = new UserProductRatingRepository();

export default class UserProductRatingController {
  async getRating(
    productId: string,
    param: Record<string, any>
  ): Promise<ProductRating[]> {
    const data = await productRatingRepository.read(productId, param);

    return data;
  }
}
