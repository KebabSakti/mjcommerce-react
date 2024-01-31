import { prisma } from "../helper/prisma";

export default class UserBannerRepository {
  async read(): Promise<Record<string, any>> {
    const result = await prisma.$transaction(async (tx) => {
      const records = await tx.banner.count({
        where: { active: true },
      });

      const query = await tx.banner.findMany({
        where: { active: true },
        skip: 0,
        take: 10,
        orderBy: {
          created: "desc",
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
