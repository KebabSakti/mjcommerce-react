import { prisma } from "../helper/prisma";
import { BannerModel } from "../../../../lib/model/banner-model";

export default class UserBannerRepository {
  async read(): Promise<BannerModel[]> {
    const result = await prisma.banner.findMany({
      where: { active: true },
      skip: 0,
      take: 10,
      orderBy: {
        created: "desc",
      },
    });

    const banners = result.map((e) => e as any as BannerModel);

    return banners;
  }
}
