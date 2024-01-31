import { prisma } from "../helper/prisma";

export default class UserCategoryRepository {
  async read(): Promise<Record<string, any>> {
    const result = await prisma.$transaction(async (tx) => {
      const records = await tx.category.count({
        where: { active: true },
      });

      const query = await tx.category.findMany({
        where: { active: true },
        orderBy: {
          name: "asc",
        },
      });

      return {
        paginate: {
          page: 1,
          total: records,
        },
        data: query,
      };
    });

    return result;
  }
}
