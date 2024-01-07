import env from "../config/env";
import { SignInParams } from "../config/type";
import HTTP from "../helper/http";
import AuthModel from "../model/authModel";

export default class AuthController {
  check(): string | null {
    const token = localStorage.getItem("token");

    return token;
  }

  async sign(params: SignInParams): Promise<AuthModel> {
    const response = await HTTP.post(`${env["BASE_URL"]}/auth/user`, params);
    const data = await response.json();

    return data;
  }
}
