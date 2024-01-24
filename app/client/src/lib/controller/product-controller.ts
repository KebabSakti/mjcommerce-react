import { Empty } from "../config/type";
import { ProductModel, ProductReadParameter } from "../model/product-model";
import ProductRating from "../model/product-rating";
import ProductRepository from "../repository/product-repository";

const productRepository = new ProductRepository();

export default class ProductController {
  async getFilteredProduct(
    param: ProductReadParameter
  ): Promise<ProductModel[]> {
    const data = await productRepository.read(param);

    return data;
  }

  async getProductDetail(id: string): Promise<ProductModel | Empty> {
    const data = await productRepository.show(id);

    return data;
  }

  calculateRating(rating: ProductRating[]): number {
    const totalRating = rating.reduce((n, { rating }) => n + rating!, 0);
    const totalUser = rating.length;
    const result = totalRating / totalUser;

    return result;
  }
}
