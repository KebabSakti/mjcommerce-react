import { PrismaClient } from "@prisma/client";
import { QueryOption } from "../config/type";
import BannerModel from "../model/banner-model";
import Repository from "./repository";

const prisma = new PrismaClient();

export default class BannerRepository
  implements Repository<BannerModel, QueryOption>
{
  async read(option?: QueryOption | undefined): Promise<BannerModel[]> {
    const result = await prisma.banner.findMany({
      ...option?.pagination,
      orderBy: option?.order,
      where: { active: true },
    });

    const banners = result.map((e) => e as any as BannerModel);

    return banners;
  }

  async readById(id: string): Promise<BannerModel | null> {
    const result = await prisma.banner.findUnique({ where: { id: id } });
    const banner = result == null ? null : (result as any as BannerModel);

    return banner;
  }

  create(data: BannerModel): Promise<void> {
    throw new Error("Method not implemented.");
  }

  update(data: BannerModel): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(data: BannerModel): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
