import { prisma } from "../helper/prisma";
import BannerModel from "../model/banner-model";

export default class BannerRepository {
  async read(): Promise<BannerModel[]> {
    const result = await prisma.banner.findMany({
      where: { active: true },
      orderBy: {
        created: "desc",
      },
    });

    const banners = result.map((e) => e as any as BannerModel);

    return banners;
  }
}
