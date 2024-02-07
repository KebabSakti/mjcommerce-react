import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Result } from "../config/type";
import { BadRequest, NotFound, Unauthorized } from "../helper/failure";
import { prisma } from "../helper/prisma";

export default class UserAuthRepository {
  async login(param: Record<string, any>): Promise<Result<string>> {
    const user = await prisma.user.findFirst({
      where: {
        active: true,
        email: param.email,
      },
    });

    if (user == null) {
      throw new NotFound("User tidak ditemukan");
    }

    const userValid = await bcrypt.compare(param.password, user.password!);

    if (!userValid) {
      throw new BadRequest("Password anda salah");
    }

    const result = jwt.sign(user.id, process.env.HASH_SALT as string);

    const data = {
      data: result as any,
    };

    return data;
  }

  async validate(token: string): Promise<Result<string>> {
    try {
      const userId = jwt.verify(
        token,
        process.env.HASH_SALT as string
      ) as string;

      const user = await prisma.user.findFirst({
        where: {
          active: true,
          id: userId,
        },
      });

      if (user == null) {
        throw new NotFound("User tidak ditemukan");
      }

      const data = {
        data: user.id,
      };

      return data;
    } catch (error) {
      throw new Unauthorized();
    }
  }
}
