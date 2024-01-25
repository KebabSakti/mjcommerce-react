import {
  ProductModel,
  ProductReadParameter,
  ProductUpdateParameter,
  ProductUpdateField,
} from "../../../../lib/model/product-model";
import { Empty } from "../config/type";
import { prisma } from "../helper/prisma";

export default class ProductRepository {
  async read(param: ProductReadParameter): Promise<ProductModel[]> {
    let condition: any = { where: { active: true } };

    if (param.filter) {
      if (param.filter.hasOwnProperty("storeId")) {
        condition["where"] = {
          ...condition.where,
          storeId: param.filter.storeId,
        };
      }

      if (param.filter.hasOwnProperty("categoryId")) {
        condition["where"] = {
          ...condition.where,
          categoryId: param.filter.categoryId,
        };
      }

      if (param.filter.hasOwnProperty("name")) {
        condition["where"] = {
          ...condition.where,
          name: { contains: param.filter.name },
        };
      }
    }

    if (param.sort) {
      condition = {
        ...condition,
        orderBy: {
          [param.sort.field]: param.sort.direction,
        },
      };
    }

    const result = await prisma.product.findMany({
      ...condition,
      include: {
        productVariant: true,
      },
      skip: param.paginate.skip,
      take: param.paginate.take,
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
