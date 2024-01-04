import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import { Unauthorized } from "../helper/failure";
import UserModel from "../model/userModel";

const prisma = new PrismaClient();

export default class UserAuthController {
  encrypt(userModel: UserModel): string {
    const token = jwt.sign(userModel.id, process.env.HASH_SALT as string);

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
    const user = (await prisma.user.findUnique({
      where: {
        email: email,
      },
    })) as any as UserModel | null;

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

    const user = (await prisma.user.create({
      data: { ...userModel, password: hashedPassword },
    })) as any as UserModel;

    const token = this.encrypt(user);

    return token;
  }

  async guest(): Promise<string> {
    const user = (await prisma.user.create({
      data: {
        link: randomUUID(),
      },
    })) as any as UserModel;

    const token = this.encrypt(user);

    return token;
  }
}
