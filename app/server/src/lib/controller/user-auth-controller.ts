import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import { InternalError, Unauthorized } from "../helper/failure";
import UserModel from "../model/user-model";
import UserRepository from "../repository/user-repository";

const userRepository = new UserRepository();

export default class UserAuthController {
  async access(token?: string): Promise<string> {
    if (token == null) {
      const userId = randomUUID();

      await userRepository.create({
        id: userId,
        link: randomUUID(),
      });

      const user = await userRepository.readById(userId);

      if (user != null) {
        const token = this.encrypt(user.id!);

        return token;
      }

      throw new InternalError();
    }

    return token;
  }

  async validate(token: string): Promise<string> {
    const userId = this.decrypt(token);
    const user = await userRepository.readById(userId);

    if (user) {
      return user.id!;
    }

    throw new Unauthorized();
  }

  async login(email: string, password: string): Promise<string> {
    const user = await userRepository.readByEmail(email);

    if (user) {
      const userValid = await bcrypt.compare(password, user.password!);

      if (userValid) {
        const token = this.encrypt(user.id!);

        return token;
      }
    }

    throw new Unauthorized();
  }

  async register(userModel: UserModel): Promise<string> {
    const hashedPassword = await bcrypt.hash(userModel.password!, 10);

    await userRepository.create({
      ...userModel,
      password: hashedPassword,
    });

    const user = await userRepository.readByEmail(userModel.email!);

    if (user) {
      const token = this.encrypt(user.id!);

      return token;
    }

    throw new InternalError();
  }

  encrypt(data: string): string {
    const token = jwt.sign(data, process.env.HASH_SALT as string);

    return token;
  }

  decrypt(token: string): string {
    try {
      const decrypted = jwt.verify(
        token,
        process.env.HASH_SALT as string
      ) as string;

      return decrypted;
    } catch (error) {
      throw new Unauthorized();
    }
  }
}
