import {
  ProductModel,
  ProductUpdateField,
  ProductUpdateParameter,
} from "../../../../lib/model/product-model";
import { Empty } from "../config/type";
import { prisma } from "../helper/prisma";

export default class UserProductRepository {
  async read(param: Record<string, any>): Promise<ProductModel[]> {
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

    if (param.hasOwnProperty("skip") && param.hasOwnProperty("take")) {
      condition = {
        ...condition,
        skip: parseInt(param.skip),
        take: parseInt(param.take),
      };
    }

    const result = await prisma.product.findMany({
      ...condition,
      include: {
        productVariant: true,
      },
    });

    const data = result.map((e) => e as any as ProductModel);

    return data;
  }

  async show(id: string): Promise<ProductModel | Empty> {
    const result = await prisma.product.findFirst({
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

    const data = result as any as ProductModel | Empty;

    return data;
  }

  async update(id: string, param: ProductUpdateParameter): Promise<void> {
    let data: any = { [param.field]: { increment: 1 } };

    if (param.field == ProductUpdateField.RATING) {
      data = { rating: param.value! };
    }

    await prisma.product.update({
      where: { id: id },
      data: data,
    });
  }
}
