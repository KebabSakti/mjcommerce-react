import { Empty } from "../config/type";
import { prisma } from "../helper/prisma";
import UserModel from "../model/user-model";

export default class UserRepository {
  async show(query: Object): Promise<UserModel | Empty> {
    const result = await prisma.user.findFirst({
      where: {
        ...query,
        active: true,
      },
    });

    const data = result as any as UserModel | Empty;

    return data;
  }

  async create(data: UserModel): Promise<void> {
    await prisma.user.create({
      data: data,
    });
  }
}
