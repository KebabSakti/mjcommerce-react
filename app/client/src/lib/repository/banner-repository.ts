import { RepositoryData } from "../config/type";
import url from "../config/url";
import HTTP from "../helper/http";
import BannerModel from "../model/banner-model";

export default class BannerRepository {
  async read(parameter?: RepositoryData): Promise<BannerModel[]> {
    const response = await HTTP.get(url["banner"], {
      token: parameter?.token,
      query: { ...parameter?.paginate, ...parameter?.sorting },
    });

    const json = await response.json();
    const datas = json.map((e: BannerModel) => e);

    return datas;
  }
}