import env from "../config/env";
import HTTP from "../helper/http";
import AuthModel from "../model/authModel";

export default class AuthController {
  check(): string | null {
    const token = localStorage.getItem("token");

    return token;
  }

  async sign(email: string, password: string): Promise<AuthModel> {
    const response = await HTTP.post(`${env["BASE_URL"]}/user/auth`, {
      email: email,
      password: password,
    });

    const data = await response.json();

    return data;
  }
}
