import { ControllerData, Empty } from "../config/type";
import BannerModel from "../model/banner-model";
import AuthRepository from "../repository/auth-repository";
import BannerRepository from "../repository/banner-repository";

const banner = new BannerRepository();
const auth = new AuthRepository();

export default class BannerController {
  async read(paramater?: ControllerData | Empty): Promise<BannerModel[]> {
    const token = auth.getToken();

    const param = {
      token: token,
      paginate: paramater?.paginate,
      sorting: paramater?.sorting,
    };

    const datas = await banner.read(param);

    return datas;
  }
}