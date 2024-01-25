import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel, UserShowField } from "../../../../lib/model/user-model";
import { InternalError, Unauthorized } from "../helper/failure";
import UserRepository from "../repository/user-repository";

const userRepository = new UserRepository();

export default class UserAuthController {
  async login(email: string, password: string): Promise<string> {
    const user = await userRepository.show({
      field: UserShowField.EMAIL,
      value: email,
    });

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

    const user = await userRepository.show({
      field: UserShowField.EMAIL,
      value: userModel.email!,
    });

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
