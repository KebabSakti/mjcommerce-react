import { Empty, RepositoryData } from "../config/type";
import { prisma } from "../helper/prisma";
import BannerModel from "../model/banner-model";


export default class BannerRepository {
  async read(parameter?: RepositoryData | Empty): Promise<BannerModel[]> {
    const result = await prisma.banner.findMany({
      where: { active: true },
      skip: parameter?.paginate?.skip,
      take: parameter?.paginate?.take,
      orderBy: {
        [parameter?.sorting?.field ?? ""]: parameter?.sorting?.direction,
      },
    });

    const banners = result.map((e) => e as any as BannerModel);

    return banners;
  }
}
