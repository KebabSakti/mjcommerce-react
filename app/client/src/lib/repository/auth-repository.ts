import { AuthToken, SignInParams } from "../config/type";
import url from "../config/url";
import HTTP from "../helper/http";

export default class AuthRepository {
  async guestToken(): Promise<AuthToken> {
    const response = await HTTP.get(url["auth"]);
    const data: AuthToken = await response.json();

    return data;
  }

  async userToken(params: SignInParams): Promise<AuthToken> {
    const response = await HTTP.post(url["auth"], params);
    const data: AuthToken = await response.json();

    return data;
  }

  getToken(): string | null {
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
