import CartModel from "./cart-model";

export default class CartItemModel {
  id?: string;
  cartId?: string;
  productId?: string;
  qty?: number;
  total?: number;
  created?: string;
  updated?: string;
  cart?: CartModel;
}
