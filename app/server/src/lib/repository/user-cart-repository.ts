import { CartItemModel } from "../../../../lib/model/cart-item-model";
import { Result } from "../config/type";
import { prisma } from "../helper/prisma";
import { CartModel } from "./../../../../lib/model/cart-model";

export default class UserCartRepository {
  async show(param: Record<string, any>): Promise<Result<CartModel>> {
    // const result = await prisma.cart.findFirst({
    //   where: { userId: param.userId },
    //   include: {
    //     cartItem: {
    //       include: {
    //         productVariant: {
    //           include: {
    //             product: true,
    //           },
    //         },
    //       },
    //     },
    //   },
    // });

    const result = await prisma.cart.findFirst({
      where: { userId: param.userId },
      include: {
        cartItem: {
          include: {
            product: true,
            productVariant: true,
          },
        },
      },
    });

    const data = {
      data: result as any,
    };

    return data;
  }

  async update(param: Record<string, any>): Promise<Result<CartModel>> {
    const cartItem: CartItemModel[] = param.cartItem;
    const cartId: string = param.id;
    const userId: string = param.userId;

    if (cartItem.length == 0) {
      await prisma.$transaction(async (tx) => {
        await tx.cartItem.deleteMany({
          where: {
            cartId: {
              contains: cartId,
            },
          },
        });

        await tx.cart.delete({
          where: {
            id: cartId,
          },
        });
      });

      return { data: null };
    } else {
      const cartQtyTotal = cartItem.reduce((a, b) => a + Number(b.qty!), 0);
      const cartTotal = cartItem.reduce((a, b) => a + Number(b.total!), 0);

      const result = await prisma.$transaction(async (tx) => {
        const cart = await tx.cart.upsert({
          where: { userId: userId },
          update: {
            qty: cartQtyTotal,
            total: cartTotal,
          },
          create: {
            id: cartId,
            userId: userId,
            qty: cartQtyTotal,
            total: cartTotal,
          },
          include: {
            cartItem: {
              include: {
                product: true,
              },
            },
          },
        });

        await tx.cartItem.deleteMany({
          where: {
            cartId: {
              contains: cartId,
            },
          },
        });

        await Promise.all(
          cartItem.map(async (e) => {
            await tx.cartItem.create({
              data: {
                cartId: cart.id,
                qty: e.qty!,
                total: e.total!,
                productId: e.productId!,
                productVariantId: e.productVariantId!,
              },
            });
          })
        );

        const result = await tx.cart.findFirst({
          where: {
            id: cartId,
          },
          include: {
            cartItem: {
              include: {
                product: true,
              },
            },
          },
        });

        const data = {
          data: result as any,
        };

        return data;
      });

      return result;
    }
  }
}
