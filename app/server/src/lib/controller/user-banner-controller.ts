import { BannerModel } from "../../../../lib/model/banner-model";
import UserBannerRepository from "../repository/user-banner-repository";

const bannerRepository = new UserBannerRepository();

export default class UserBannerController {
  async getBanner(): Promise<BannerModel[]> {
    const banners = await bannerRepository.read();

    return banners;
  }
}
