import { ProductRating } from "../../../../lib/model/product-rating";
import { prisma } from "../helper/prisma";

export default class UserProductRatingRepository {
  async read(
    productId: string,
    param: Record<string, any>
  ): Promise<ProductRating[]> {
    const sortingField = ["rating"];
    let condition: any = { where: { productId: productId } };

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

    if (param.hasOwnProperty("page")) {
      const skip = param.page == 1 ? 0 : param.page * 10;

      condition = {
        ...condition,
        skip: skip,
        take: 10,
      };
    }

    const result = await prisma.productRating.findMany({
      ...condition,
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    
    const data = result.map((e) => e as any as ProductRating);

    return data;
  }
}
