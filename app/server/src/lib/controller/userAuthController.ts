import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Unauthorized } from "../helper/failure";
import AuthModel from "../model/authModel";
import UserModel from "../model/userModel";

const prisma = new PrismaClient();

export default class UserAuthController {
  async sign(email: string, password: string): Promise<AuthModel> {
    const user = (await prisma.user.findUnique({
      where: {
        email: email,
      },
    })) as any as UserModel | null;

    if (user) {
      const userValid = await bcrypt.compare(password, user.password!);

      if (userValid) {
        const authModel = this.token(user);

        return authModel;
      }
    }

    throw new Unauthorized();
  }

  async register(userModel: UserModel): Promise<AuthModel> {
    const hashedPassword = await bcrypt.hash(userModel.password!, 10);

    const user = (await prisma.user.create({
      data: { ...userModel, password: hashedPassword },
    })) as any as UserModel;

    const authModel = this.token(user);

    return authModel;
  }

  protected token(userModel: UserModel): AuthModel {
    const token = jwt.sign(
      { id: userModel.id },
      process.env.HASH_SALT as string
    );

    const authModel: AuthModel = { token: token };

    return authModel;
  }
}
