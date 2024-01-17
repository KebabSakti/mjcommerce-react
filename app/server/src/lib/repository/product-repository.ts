import { Empty, RepositoryData } from "../config/type";
import { prisma } from "../helper/prisma";
import ProductModel from "../model/product-model";

export default class ProductRepository {
  async read(parameter?: RepositoryData | Empty): Promise<ProductModel[]> {
    const result = await prisma.product.findMany({
      where: { active: true },
      skip: parameter?.paginate?.skip,
      take: parameter?.paginate?.take,
      orderBy: {
        [parameter?.sorting?.field ?? ""]: parameter?.sorting?.direction,
      },
    });

    const products = result.map((e) => e as any as ProductModel);

    return products;
  }
}
