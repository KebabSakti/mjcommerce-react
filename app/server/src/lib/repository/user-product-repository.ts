import { Empty } from "../../../../lib/config/type";
import { prisma } from "../helper/prisma";
import { ProductModel } from "./../../../../lib/model/product-model";

export default class UserProductRepository {
  async read(param: Record<string, any>): Promise<Record<string, any>> {
    const result = await prisma.$transaction(async (tx) => {
      const sortingField = [
        "priority",
        "sell",
        "price",
        "view",
        "rating",
        "created",
      ];

      let condition: any = { where: { active: true } };

      if (param.hasOwnProperty("storeId")) {
        condition["where"] = {
          ...condition.where,
          storeId: param.storeId,
        };
      }

      if (param.hasOwnProperty("categoryId")) {
        condition["where"] = {
          ...condition.where,
          categoryId: param.categoryId,
        };
      }

      if (param.hasOwnProperty("name")) {
        condition["where"] = {
          ...condition.where,
          name: { contains: param.name },
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

      const records = await tx.product.count({
        ...condition,
        skip: undefined,
        take: undefined,
      });

      const query = await tx.product.findMany({
        ...condition,
        include: {
          productVariant: true,
        },
      });

      const data = {
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

  async show(id: string): Promise<ProductModel | Empty> {
    const result = await prisma.$transaction(async (tx) => {
      const query = tx.product.findFirst({
        where: { active: true, id: id },
        include: {
          store: true,
          category: true,
          productGalery: true,
          productVariant: true,
          productRating: {
            select: {
              rating: true,
              comment: true,
              productName: true,
              user: {
                select: {
                  name: true,
                },
              },
            },
            orderBy: {
              rating: "desc",
            },
          },
        },
      });

      await tx.product.update({
        where: { id: id },
        data: { view: { increment: 1 } },
      });

      const data = query as any as ProductModel | Empty;

      return data;
    });

    return result;
  }
}
