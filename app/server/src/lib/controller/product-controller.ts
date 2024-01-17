import { ControllerData, Empty } from "../config/type";
import ProductModel from "../model/product-model";
import ProductRepository from "../repository/product-repository";

const productRepository = new ProductRepository();

export default class ProductController {
  async getProducts(parameter?: ControllerData | Empty): Promise<ProductModel[]> {
    const products = await productRepository.read(parameter);

    return products;
  }
}
