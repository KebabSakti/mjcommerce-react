import { PrismaClient } from "@prisma/client";
import CartModel from "../model/cart-model";

const prisma = new PrismaClient();

export default class CartRepository {
  async getByUserId(userId: string): Promise<CartModel | null> {
    const result = await prisma.cart.findFirst({
      where: { userId: userId },
      include: {
        cartItem: true,
      },
    });

    const cart = result == null ? null : (result as any as CartModel);

    return cart;
  }
}
