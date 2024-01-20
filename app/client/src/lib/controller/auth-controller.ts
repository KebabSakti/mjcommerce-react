import { Empty } from "../config/type";
import AuthRepository from "../repository/auth-repository";

const authRepository = new AuthRepository();

export default class AuthController {
  token(): string | Empty {
    const token = authRepository.read();

    return token;
  }
}
