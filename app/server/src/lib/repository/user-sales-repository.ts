import { prisma } from "../helper/prisma";

export default class UserSalesRepository {
  async index(param: Record<string, any>): Promise<Record<string, any>> {
    const skip = (Number(param.page) - 1) * Number(param.limit);

    const result = await prisma.order.groupBy({
      by: ["userId", "userName"],
      _sum: {
        payTotal: true,
        productQty: true,
      },
      orderBy: {
        _sum: {
          payTotal: "desc",
        },
      },
      where: {
        statusOrder: "COMPLETED",
        storeId: param.storeId,
        updated: {
          gte: param.startDate + "T00:00:00.000Z",
          lte: param.endDate + "T23:59:59.999Z",
        },
      },
      skip: skip,
      take: parseInt(param.limit),
    });

    const data: Record<string, any> = {
      paginate: {
        page: param.page,
        total: result.length,
      },
      data: result,
    };

    return data;
  }
}
