import { PrismaClient } from "@prisma/client";
import { QueryOption } from "../config/type";
import UserModel from "../model/user-model";
import Repository from "./repository";

const prisma = new PrismaClient();

export default class UserRepository
  implements Repository<UserModel, QueryOption>
{
  read(option?: QueryOption | undefined): Promise<UserModel[]> {
    throw new Error("Method not implemented.");
  }

  async readById(id: string): Promise<UserModel | null> {
    const result = await prisma.user.findUnique({ where: { id: id } });
    const user = result == null ? null : (result as any as UserModel);

    return user;
  }

  async readByEmail(email: string): Promise<UserModel | null> {
    const result = (await prisma.user.findFirst({
      where: { email: email },
    })) as any as UserModel;

    const user = result == null ? null : (result as any as UserModel);

    return user;
  }

  async create(data: UserModel): Promise<void> {
    await prisma.user.create({
      data: data,
    });
  }

  update(data: UserModel): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(data: UserModel): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
