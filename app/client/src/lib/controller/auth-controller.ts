import AuthRepository from "../repository/auth-repository";

const authRepository = new AuthRepository();

export default class AuthController {
  async access(token?: string): Promise<string> {
    const savedToken = this.token();
    const result = await authRepository.access(savedToken);
    token = result.token;
    authRepository.saveToken(result.token);

    return token!;
  }

  token(): string | null {
    const token = authRepository.getToken();

    return token;
  }
}
