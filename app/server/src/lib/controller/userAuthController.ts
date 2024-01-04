import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Unauthorized } from "../helper/failure";
import AuthModel from "../model/authModel";
import UserModel from "../model/userModel";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export default class UserAuthController {
  encrypt(userModel: UserModel): AuthModel {
    const token = jwt.sign(
      { id: userModel.id },
      process.env.HASH_SALT as string
    );

    const authModel: AuthModel = {
      id: userModel.id,
      token: token,
      level: "user",
    };

    return authModel;
  }

  decrypt(token: string): AuthModel {
    const authModel = jwt.verify(
      token,
      process.env.HASH_SALT as string
    ) as AuthModel;

    return authModel;
  }

  async sign(email: string, password: string): Promise<AuthModel> {
    const user = (await prisma.user.findUnique({
      where: {
        email: email,
      },
    })) as any as UserModel | null;

    if (user) {
      const userValid = await bcrypt.compare(password, user.password!);

      if (userValid) {
        const authModel = this.encrypt(user);

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

    const authModel = this.encrypt(user);

    return authModel;
  }

  async guest(): Promise<AuthModel> {
    const user = (await prisma.user.create({
      data: {
        link: randomUUID(),
      },
    })) as any as UserModel;

    const authModel = this.encrypt(user);

    return authModel;
  }
}
