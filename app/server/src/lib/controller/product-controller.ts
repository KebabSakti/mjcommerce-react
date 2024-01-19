import { Empty } from "../config/type";
import {
  ProductModel,
  ProductReadParameter,
  ProductUpdateField,
  ProductUpdateParameter,
} from "../model/product-model";
import ProductRepository from "../repository/product-repository";

const productRepository = new ProductRepository();

export default class ProductController {
  async getFilteredProduct(
    param: ProductReadParameter
  ): Promise<ProductModel[]> {
    const result = await productRepository.read(param);
    const data = result.map((e) => e as any as ProductModel);

    return data;
  }

  async getProductDetail(id: string): Promise<ProductModel | Empty> {
    const result = await productRepository.show(id);

    if (result) {
      //increment product view by 1
      const param: ProductUpdateParameter = {
        field: ProductUpdateField.VIEW,
      };

      await productRepository.update(id, param);
    }

    return result;
  }
}
