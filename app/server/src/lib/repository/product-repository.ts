import { PrismaClient } from "@prisma/client";
import { QueryOption } from "../config/type";
import ProductModel from "../model/product-model";
import Repository from "./repository";

const prisma = new PrismaClient();

export default class ProductRepository extends Repository<
  ProductModel,
  QueryOption
> {
  async read(option?: QueryOption | undefined): Promise<ProductModel[]> {
    const result = await prisma.product.findMany({
      ...option?.pagination,
      orderBy: option?.order,
      include: {
        productGalery: option?.relation,
        productRating: option?.relation,
      },
      where: {
        active: true,
      },
    });

    const products = result.map((e) => e as any as ProductModel);

    return products;
  }

  readById(id: string): Promise<ProductModel | null> {
    throw new Error("Method not implemented.");
  }

  create(data: ProductModel): Promise<void> {
    throw new Error("Method not implemented.");
  }

  update(data: ProductModel): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(data: ProductModel): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
