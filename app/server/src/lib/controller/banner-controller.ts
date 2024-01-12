import { QueryOption } from "../config/type";
import BannerModel from "../model/banner-model";
import BannerRepository from "../repository/banner-repository";

const bannerRepository = new BannerRepository();

export default class BannerController {
  async getBanners(option?: QueryOption): Promise<BannerModel[]> {
    const banners = await bannerRepository.read(option);

    return banners;
  }
}
