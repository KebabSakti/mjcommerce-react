import { Empty, PaginationData, Sorting } from "../config/type";
import { prisma } from "../helper/prisma";
import ProductModel from "../model/product-model";

export default class ProductRepository {
  async read(query: ProductQuery): Promise<ProductModel[]> {
    const result = await prisma.product.findMany({
      where: { active: true, name: { search: "" } },
      skip: query.paginate.skip,
      take: query.paginate.take,
      orderBy: {
        [query.sort.field]: query.sort.direction,
      },
    });

    const products = result.map((e) => e as any as ProductModel);

    return products;
  }
}

export enum ProductSort {
  Created = "created",
  Sell = "sell",
  View = "view",
  Rating = "rating",
  Price = "price",
}

export type ProductFilter = {
  name?: string | Empty;
};

export type ProductQuery = {
  filter?: ProductFilter | Empty;
  sort: Sorting<ProductSort>;
  paginate: PaginationData;
};
