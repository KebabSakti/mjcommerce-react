import { prisma } from "../helper/prisma";

interface BannerData {
  id?: string;
  name?: string;
  description?: string;
  picture?: string;
  big?: boolean;
  active?: boolean;
  created?: string;
  updated?: string;
}

export class BannerModel {
  model?: BannerData;

  async read(): Promise<Record<string, any>> {
    const query = await prisma.banner.findMany({
      where: { active: true },
      skip: 0,
      take: 10,
      orderBy: {
        created: "desc",
      },
    });

    return query;
  }
}
