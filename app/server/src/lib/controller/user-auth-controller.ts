import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import { Unauthorized } from "../helper/failure";
import UserModel from "../model/user-model";
import UserRepository from "../repository/user-repository";

const userRepository = new UserRepository();

export default class UserAuthController {
  encrypt(user: UserModel): string {
    const token = jwt.sign(user.id!, process.env.HASH_SALT as string);

    return token;
  }

  decrypt(token: string): string {
    try {
      const userId = jwt.verify(
        token,
        process.env.HASH_SALT as string
      ) as string;

      return userId;
    } catch (error) {
      throw new Unauthorized();
    }
  }

  async sign(email: string, password: string): Promise<string> {
    const user = await userRepository.getByEmail(email);

    if (user) {
      const userValid = await bcrypt.compare(password, user.password!);

      if (userValid) {
        const token = this.encrypt(user);

        return token;
      }
    }

    throw new Unauthorized();
  }

  async register(userModel: UserModel): Promise<string> {
    const hashedPassword = await bcrypt.hash(userModel.password!, 10);

    const user = await userRepository.createUser({
      ...userModel,
      password: hashedPassword,
    });

    const token = this.encrypt(user);

    return token;
  }

  async guest(): Promise<string> {
    const user = await userRepository.createUser({
      link: randomUUID(),
    });

    const token = this.encrypt(user);

    return token;
  }
}
