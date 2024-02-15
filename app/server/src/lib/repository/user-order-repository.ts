import { Result } from "../config/type";
import { invoice } from "../helper/common";
import { prisma } from "../helper/prisma";
import { OrderModel } from "./../../../../lib/model/order-model";

export default class UserOrderRepository {
  async create(param: Record<string, any>): Promise<Result<OrderModel>> {
    const result = await prisma.$transaction(async (tx) => {
      await Promise.all(
        await param.stores.map(async (store: any) => {
          const order = await tx.order.create({
            data: {
              invoice: invoice(),
              userId: param.userId,
              userName: param.userName,
              userPhone: param.userPhone,
              paymentId: param.paymentId,
              paymentName: param.paymentName,
              paymentPicture: param.paymentPicture,
              paymentFee: param.paymentFee,
              paymentFixed: param.paymentFixed,
              receiverName: param.receiverName,
              receiverAddress: param.receiverAddress,
              receiverPhone: param.receiverPhone,
              receiverLat: param.receiverLat,
              receiverLng: param.receiverLng,
              adminFee: param.adminFee,
              payTotal: store.total,
              productQty: store.qty,
              productTotal: store.total,
              shippingFee: param.shippingFee,
              orderItem: {
                create: store.items,
              },
              orderStatus: {
                create: {
                  status: "PENDING",
                },
              },
              paymentStatus: {
                create: {
                  status: "PENDING",
                },
              },
              shippingStatus: {
                create: {
                  status: "PENDING",
                },
              },
            },
          });
        })
      );

      const data = {
        data: null,
      };

      return data;
    });

    return result;
  }
}
