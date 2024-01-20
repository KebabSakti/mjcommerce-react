import { ProductModel, ProductReadParameter } from "../model/product-model";
import ProductRepository from "../repository/product-repository";

const productRepository = new ProductRepository();

export default class ProductController {
  async getFilteredProduct(
    param: ProductReadParameter
  ): Promise<ProductModel[]> {
    const data = await productRepository.read(param);

    return data;
  }
}
