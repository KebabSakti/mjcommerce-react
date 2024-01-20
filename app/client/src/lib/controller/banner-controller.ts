import BannerModel from "../model/banner-model";
import BannerRepository from "../repository/banner-repository";

const banner = new BannerRepository();

export default class BannerController {
  async getBanner(): Promise<BannerModel[]> {
    const data = await banner.read();

    return data;
  }
}
