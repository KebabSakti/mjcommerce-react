import AuthRepository from "../repository/auth-repository";

const authRepository = new AuthRepository();

export default class AuthController {
  async getToken(token?: string): Promise<string> {
    const savedToken = authRepository.getToken();
    const result = await authRepository.access(savedToken);
    token = result.token;
    authRepository.saveToken(result.token);

    return token!;
  }
}
