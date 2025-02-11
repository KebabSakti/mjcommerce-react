import { ProductModel } from "./product-model";

export interface ProductPrice {
  id?: string;
  productId?: string;
  min?: number;
  max?: number;
  price?: number;
  created?: string;
  updated?: string;
  product?: ProductModel;
}
