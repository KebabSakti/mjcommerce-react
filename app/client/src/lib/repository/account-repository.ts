import { url } from "../config/url";
import { urlParser } from "../helper/common";
import { Failure } from "../helper/failure";

export default class AccountRepository {
  async show(param: Record<string, any>): Promise<Record<string, any>> {
    const token = param.token;
    delete param.token;
    const queryUrl = urlParser(url.account, param);

    const response = await fetch(queryUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw Failure.network(response);
    }

    const data = await response.json();

    return data;
  }

  async update(param: Record<string, any>): Promise<void> {
    const token = param.token;
    const queryUrl = urlParser(url.account);
    delete param.token;

    const response = await fetch(queryUrl, {
      method: "PUT",
      body: JSON.stringify(param),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw Failure.network(response);
    }
  }
}
