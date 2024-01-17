import { ControllerData, Empty } from "../config/type";
import BannerModel from "../model/banner-model";
import BannerRepository from "../repository/banner-repository";

const bannerRepository = new BannerRepository();

export default class BannerController {
  async getBanners(parameter?: ControllerData | Empty): Promise<BannerModel[]> {
    const banners = await bannerRepository.read(parameter);

    return banners;
  }
}
