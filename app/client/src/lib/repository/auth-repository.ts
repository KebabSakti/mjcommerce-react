import { AuthToken, Empty, RepositoryData } from "../config/type";
import url from "../config/url";
import HTTP from "../helper/http";

export default class AuthRepository {
  async access(parameter?: RepositoryData<AuthToken>): Promise<AuthToken> {
    const response = await HTTP.post(url["auth"], {
      data: parameter?.payload,
    });

    const data: AuthToken = await response.json();

    return data;
  }

  getToken(): string | Empty {
    const token = localStorage.getItem("token");

    return token;
  }

  saveToken(token: string) {
    localStorage.setItem("token", token);
  }

  removeToken() {
    localStorage.removeItem("token");
  }
}
