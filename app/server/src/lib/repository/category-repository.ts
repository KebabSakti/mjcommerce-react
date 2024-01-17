import { Empty, RepositoryData } from "../config/type";
import { prisma } from "../helper/prisma";
import CategoryModel from "../model/category-model";


export default class CategoryRepository {
  async read(parameter?: RepositoryData | Empty): Promise<CategoryModel[]> {
    const result = await prisma.category.findMany({
      where: { active: true },
      skip: parameter?.paginate?.skip,
      take: parameter?.paginate?.take,
      orderBy: {
        [parameter?.sorting?.field ?? ""]: parameter?.sorting?.direction,
      },
    });

    const categories = result.map((e) => e as any as CategoryModel);

    return categories;
  }
}
