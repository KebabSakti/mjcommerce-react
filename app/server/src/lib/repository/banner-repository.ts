import { PrismaClient } from "@prisma/client";
import { PaginationData } from "../config/type";
import BannerModel from "../model/banner-model";

const prisma = new PrismaClient();

export default class BannerRepository {
  async read(paginate?: PaginationData | null): Promise<BannerModel[]> {
    const result = await prisma.banner.findMany({
      ...paginate,
      where: { active: true },
    });

    const banners = result.map((e) => e as any as BannerModel);

    return banners;
  }
}
