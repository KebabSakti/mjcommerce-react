import { PrismaClient } from "@prisma/client";
import { PaginationData } from "../config/type";
import CategoryModel from "../model/category-model";

const prisma = new PrismaClient();

export default class CategoryRepository {
  async getCategories(pagination?: PaginationData): Promise<CategoryModel[]> {
    const result = await prisma.category.findMany({
      ...pagination,
      where: {
        active: true,
      },
    });

    const categories = result.map((e) => {
      return e as any as CategoryModel;
    });

    return categories;
  }
}
