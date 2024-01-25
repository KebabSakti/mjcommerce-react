import { prisma } from "../helper/prisma";
import { CategoryModel } from './../../../../lib/model/category-model';

export default class CategoryRepository {
  async read(): Promise<CategoryModel[]> {
    const result = await prisma.category.findMany({
      where: { active: true },
      orderBy: {
        name: "asc",
      },
    });

    const data = result.map((e) => e as any as CategoryModel);

    return data;
  }
}
