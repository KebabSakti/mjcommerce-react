import url from "../config/url";
import HTTP from "../helper/http";
import {BannerModel} from "../../../../lib/model/banner-model";

export default class BannerRepository {
  async read(): Promise<BannerModel[]> {
    const response = await HTTP.get(url["banner"]);
    const json = await response.json();
    const data = json.map((e: BannerModel) => e);

    return data;
  }
}
