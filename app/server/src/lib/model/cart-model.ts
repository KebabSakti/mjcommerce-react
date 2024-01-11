import CartItemModel from "./cart-item-model";

export default interface CartModel {
  id?: string;
  userId?: string;
  qty?: number;
  total?: number;
  created?: string;
  updated?: string;
  cartItem?: CartItemModel[];
}
