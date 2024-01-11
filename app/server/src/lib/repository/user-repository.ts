import { PrismaClient } from "@prisma/client";
import UserModel from "../model/user-model";

const prisma = new PrismaClient();

export default class UserRepository {
  async createUser(data: UserModel): Promise<UserModel> {
    const user = (await prisma.user.create({
      data: data,
    })) as any as UserModel;

    return user;
  }

  async getByEmail(email: string | null): Promise<UserModel> {
    const user = (await prisma.user.findFirst({
      where: { email: email },
    })) as any as UserModel;

    return user;
  }
}
