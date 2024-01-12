import AuthRepository from "../repository/auth-repository";

const authRepository = new AuthRepository();

export default class AuthController {
  async getToken(): Promise<string> {
    const savedToken = authRepository.getToken();
    const result = await authRepository.access(savedToken);
    const token = result.token;

    authRepository.saveToken(token);

    return token;
  }
}
