import { url } from "../config/url";
import { urlParser } from "../helper/common";
import { Failure } from "../helper/failure";

export default class StoreRepository {
  async show(param: Record<string, any>): Promise<Record<string, any>> {
    const queryUrl = urlParser(url.store, param);

    const response = await fetch(queryUrl, {
      headers: {
        Authorization: `Bearer ${param.token}`,
      },
    });

    if (!response.ok) {
      throw Failure.network(response);
    }

    const data = await response.json();

    return data;
  }
}
