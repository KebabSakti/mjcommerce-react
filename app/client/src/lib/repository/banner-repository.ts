import { BannerModel } from "../../../../lib/model/banner-model";
import url from "../config/url";
import { Failure } from "../helper/failure";
import { urlParser } from "../helper/url-parser";

export default class BannerRepository {
  async read(): Promise<BannerModel[]> {
    const queryUrl = urlParser(url["banner"]);
    const response = await fetch(queryUrl);

    if (!response.ok) {
      throw Failure.network(response);
    }

    const json = await response.json();
    const data = json.map((e: BannerModel) => e);

    return data;
  }
}
