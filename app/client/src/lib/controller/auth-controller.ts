import AuthRepository from "../repository/auth-repository";

const authRepository = new AuthRepository();

export default class AuthController {
  async getToken(): Promise<string> {
    let token = authRepository.getToken();

    if (token == null) {
      const result = await authRepository.access();
      token = result.token;
      authRepository.saveToken(result.token);
    }

    return token!;
  }
}
