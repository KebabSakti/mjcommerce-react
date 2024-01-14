import { RequestParameter } from "../config/type";
import url from "../config/url";
import HTTP from "../helper/http";
import BannerModel from "../model/banner-model";

export default class BannerRepository {
  async read(param: RequestParameter): Promise<BannerModel[]> {
    const response = await HTTP.get(url["banner"], param.token, param.data);
    const data = await response.json();
    const banners = data.map((e: BannerModel) => e);

    return banners;
  }
}
