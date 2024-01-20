import { Empty } from "../config/type";

export default class AuthRepository {
  read(): string | Empty {
    const token = localStorage.getItem("token");

    return token;
  }

  create(token: string) {
    localStorage.setItem("token", token);
  }

  delete() {
    localStorage.removeItem("token");
  }
}
