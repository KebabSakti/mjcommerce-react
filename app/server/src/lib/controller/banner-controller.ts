import BannerModel from "../model/banner-model";
import BannerRepository from "../repository/banner-repository";

const bannerRepository = new BannerRepository();

export default class BannerController {
  async getBanners(): Promise<BannerModel[]> {
    const banners = await bannerRepository.read();

    return banners;
  }
}
