import {
  ProductModel,
  ProductUpdateField
} from "../../../../lib/model/product-model";
import { Empty } from "../config/type";
import UserProductRepository from "../repository/user-product-repository";

const productRepository = new UserProductRepository();

export default class UserProductController {
  async getFilteredProduct(
    param: Record<string, any>
  ): Promise<ProductModel[]> {
    const result = await productRepository.read(param);
    const data = result.map((e) => e as any as ProductModel);

    return data;
  }

  async getProductDetail(id: string): Promise<ProductModel | Empty> {
    const result = await productRepository.show(id);

    return result;
  }

  async incrementProductView(id: string): Promise<void> {
    await productRepository.update(id, {
      field: ProductUpdateField.VIEW,
    });
  }

  async setProductRate(id: string, value: number): Promise<void> {
    await productRepository.update(id, {
      field: ProductUpdateField.RATING,
      value: value,
    });
  }

  async viewProduct(id: string): Promise<ProductModel | Empty> {
    const result = await this.getProductDetail(id);

    if (result) {
      await this.incrementProductView(id);
    }

    return result;
  }
}
