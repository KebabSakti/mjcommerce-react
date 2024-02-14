import { url } from "../config/url";
import { urlParser } from "../helper/common";
import { Failure } from "../helper/failure";

export default class OrderRepository {
  async create(param: Record<string, any>): Promise<void> {
    const payload = { ...param };
    const queryUrl = urlParser(url.order);
    delete payload.token;

    const response = await fetch(queryUrl, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${param.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw Failure.network(response);
    }

    const data = await response.json();

    return data;
  }
}
