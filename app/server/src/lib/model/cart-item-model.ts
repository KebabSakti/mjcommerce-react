import CartModel from "./cart-model";

export default interface CartItemModel {
  id?: string;
  cartId?: string;
  productId?: string;
  qty?: number;
  total?: number;
  created?: string;
  updated?: string;
  cart?: CartModel;
}
