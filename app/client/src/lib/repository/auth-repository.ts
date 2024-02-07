import { Empty, Result } from "../config/type";
import { url } from "../config/url";
import { urlParser } from "../helper/common";
import { Failure } from "../helper/failure";

export default class AuthRepository {
  load(): Result<string | Empty> {
    const token = localStorage.getItem("token");

    const data = {
      data: token,
    };

    return data;
  }

  async login(param: Record<string, any>): Promise<Result<string>> {
    const queryUrl = urlParser(url.login);

    const response = await fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    });

    if (!response.ok) {
      throw Failure.network(response);
    }

    const data = await response.json();
    localStorage.setItem("token", data.data);

    return data;
  }

  logout() {
    localStorage.removeItem("token");
  }
}
