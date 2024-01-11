import { QueryOption } from "../config/type";
import ProductModel from "../model/product-model";
import Repository from "./repository";

export default class ProductRepository extends Repository<
  ProductModel,
  QueryOption
> {
  create(data: ProductModel): Promise<ProductModel> {
    throw new Error("Method not implemented.");
  }
  update(data: ProductModel): Promise<ProductModel> {
    throw new Error("Method not implemented.");
  }
  delete(data: ProductModel): Promise<ProductModel> {
    throw new Error("Method not implemented.");
  }
  read(option?: QueryOption | undefined): Promise<ProductModel> {
    throw new Error("Method not implemented.");
  }
  readById(id: string): Promise<ProductModel> {
    throw new Error("Method not implemented.");
  }
}
