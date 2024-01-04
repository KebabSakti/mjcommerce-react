import AuthModel from "../model/authModel";
import env from "../config/env";

export default class AuthController {
  async token(): Promise<AuthModel> {
    const request = await fetch(`${env["BASE_URL"]}/user/auth`);
    const result = await request.json();

    return result;
  }
}
