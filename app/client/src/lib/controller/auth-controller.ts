import AuthRepository from "../repository/auth-repository";

const authRepository = new AuthRepository();

export default class AuthController {
  async getToken(): Promise<string> {
    let token = authRepository.getToken();

    if (token == null) {
      const guest = await authRepository.guestToken();
      token = guest.token;
      authRepository.saveToken(token);
    }

    return token;
  }
}
