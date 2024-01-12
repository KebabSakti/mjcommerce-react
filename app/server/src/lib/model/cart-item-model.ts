import CartModel from "./cart-model";
import ProductModel from "./product-model";

export default interface CartItemModel {
  id?: string;
  cartId?: string;
  productId?: string;
  qty?: number;
  total?: number;
  created?: string;
  updated?: string;
  cart?: CartModel;
  product?: ProductModel;
}
