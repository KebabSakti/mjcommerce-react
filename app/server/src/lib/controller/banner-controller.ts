import { PaginationData } from "../config/type";
import BannerModel from "../model/banner-model";
import BannerRepository from "../repository/banner-repository";

const bannerRepository = new BannerRepository();

export default class BannerController {
  async getBanners(pagination?: PaginationData): Promise<BannerModel[]> {
    const banners = await bannerRepository.getBanners(pagination);

    return banners;
  }
}
