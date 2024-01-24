import { ProductModel } from "./product-model";
import UserModel from "./user-model";

export default interface ProductVariant {
  id?: string;
  productId?: string;
  name?: string;
  stok?: number;
  min?: number;
  max?: number;
  price?: number;
  wholesalePrice?: number;
  wholesaleMin?: number;
  unit?: string;
  weight?: number;
  created?: string;
  updated?: string;
  product?: ProductModel;
}
