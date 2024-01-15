import { Empty, RequestParameter } from "../config/type";
import BannerModel from "../model/banner-model";
import AuthRepository from "../repository/auth-repository";
import BannerRepository from "../repository/banner-repository";

const bannerRepository = new BannerRepository();
const authRepository = new AuthRepository();

export default class BannerController {
  async read(paramater?: RequestParameter | Empty): Promise<BannerModel[]> {
    const token = authRepository.getToken();

    const param = {
      token: token,
      paginate: paramater?.paginate,
      sorting: paramater?.sorting,
    };

    const banners = await bannerRepository.read(param);

    return banners;
  }
}
