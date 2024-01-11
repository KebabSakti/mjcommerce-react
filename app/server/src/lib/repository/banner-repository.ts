import { PrismaClient } from "@prisma/client";
import { PaginationData } from "../config/type";
import BannerModel from "../model/banner-model";

const prisma = new PrismaClient();

export default class BannerRepository {
  async getBanners(pagination?: PaginationData): Promise<BannerModel[]> {
    const result = await prisma.banner.findMany({
      ...pagination,
      where: { active: true },
    });

    const banners = result.map((e) => {
      return e as any as BannerModel;
    });

    return banners;
  }
}
