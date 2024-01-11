import CartModel from "../model/cart-model";
import CartRepository from "../repository/cart-repository";

const cartRepository = new CartRepository();

export default class CartController {
  async getByUserId(userId: string): Promise<CartModel | null> {
    const cart = await cartRepository.getByUserId(userId);

    return cart;
  }
}
