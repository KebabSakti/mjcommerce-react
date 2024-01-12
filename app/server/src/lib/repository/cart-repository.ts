import { PrismaClient } from "@prisma/client";
import CartModel from "../model/cart-model";
import Repository from "./repository";
import { QueryOption } from "../config/type";

const prisma = new PrismaClient();

export default class CartRepository
  implements Repository<CartModel, QueryOption>
{
  read(option?: QueryOption | undefined): Promise<CartModel[]> {
    throw new Error("Method not implemented.");
  }

  readById(id: string): Promise<CartModel | null> {
    throw new Error("Method not implemented.");
  }

  async readByUserId(userId: string): Promise<CartModel | null> {
    const result = await prisma.cart.findFirst({
      where: { userId: userId },
      include: {
        cartItem: {
          include: {
            product: true,
          },
        },
      },
    });

    const cart = result == null ? null : (result as any as CartModel);

    return cart;
  }

  create(data: CartModel): Promise<void> {
    throw new Error("Method not implemented.");
  }

  update(data: CartModel): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(data: CartModel): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
