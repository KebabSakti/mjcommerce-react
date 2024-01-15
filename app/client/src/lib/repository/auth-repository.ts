import { AuthToken, Empty } from "../config/type";
import url from "../config/url";
import HTTP from "../helper/http";

export default class AuthRepository {
  async access(token?: string | Empty): Promise<AuthToken> {
    const response = await HTTP.post(url["auth"], { token: token });
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
