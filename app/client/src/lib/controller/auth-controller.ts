import { Empty } from "../config/type";
import AuthRepository from "../repository/auth-repository";

const authRepository = new AuthRepository();

export default class AuthController {
  async access(): Promise<string> {
    let token = this.token();

    const result = await authRepository.access({
      payload: { token: token },
    });

    token = result.token!;
    authRepository.saveToken(token);

    return token!;
  }

  token(): string | Empty {
    const token = authRepository.getToken();

    return token;
  }
}
