import { Result } from "../config/type";
import { invoice } from "../helper/common";
import { prisma } from "../helper/prisma";
import { OrderModel } from "./../../../../lib/model/order-model";

export default class UserOrderRepository {
  async read(param: Record<string, any>): Promise<Record<string, any>> {
    const result = await prisma.$transaction(async (tx) => {
      const sortingField = ["updated"];

      let condition: any = {
        where: {},
      };

      if (param.hasOwnProperty("orderStatus")) {
        condition["where"] = {
          ...condition.where,
          orderStatus: {
            status: {
              contains: param.orderStatus,
            },
          },
        };
      }

      if (param.hasOwnProperty("storeId")) {
        condition["where"] = {
          ...condition.where,
          orderItem: {
            storeId: {
              has: param.storeId,
            },
          },
        };
      }

      if (param.hasOwnProperty("invoice")) {
        condition["where"] = {
          ...condition.where,
          invoice: { contains: param.invoice },
        };
      }

      if (param.hasOwnProperty("sort") && param.hasOwnProperty("direction")) {
        const index = sortingField.indexOf(param.sort);

        if (index >= 0) {
          condition = {
            ...condition,
            orderBy: {
              [sortingField[index]]: param.direction,
            },
          };
        }
      }

      if (param.hasOwnProperty("page") && param.hasOwnProperty("limit")) {
        const skip = param.page == 1 ? 0 : param.page * param.limit;

        condition = {
          ...condition,
          skip: skip,
          take: parseInt(param.limit),
        };
      }

      const records = await tx.order.count({
        ...condition,
        skip: undefined,
        take: undefined,
      });

      const query = await tx.order.findMany({
        ...condition,
        include: {
          orderItem: true,
          orderStatus: {
            orderBy: {
              created: "desc",
            },
          },
        },
      });

      const data: Record<string, any> = {
        paginate: {
          page: param.page,
          total: records,
        },
        data: query,
      };

      return data;
    });

    return result;
  }

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
              storeId: param.storeId,
              storeUserId: param.storeUserId,
              storeName: param.storeName,
              storePhone: param.storePhone,
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
              statusOrder: "PENDING",
              statusPayment: "PENDING",
              statusShipping: "PENDING",
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
