import { PrismaClient } from "@prisma/client";
import { QueryOption } from "../config/type";
import CategoryModel from "../model/category-model";
import Repository from "./repository";

const prisma = new PrismaClient();

export default class CategoryRepository
  implements Repository<CategoryModel, QueryOption>
{
  async read(option?: QueryOption | undefined): Promise<CategoryModel[]> {
    const result = await prisma.category.findMany({
      ...option?.pagination,
      orderBy: option?.order,
      where: {
        active: true,
      },
    });

    const categories = result.map((e) => e as any as CategoryModel);

    return categories;
  }

  readById(id: string): Promise<CategoryModel | null> {
    throw new Error("Method not implemented.");
  }

  create(data: CategoryModel): Promise<void> {
    throw new Error("Method not implemented.");
  }

  update(data: CategoryModel): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(data: CategoryModel): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
