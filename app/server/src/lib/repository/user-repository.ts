import { Empty } from "../config/type";
import { prisma } from "../helper/prisma";
import {
  UserModel,
  UserShowField,
  UserShowParameter,
} from "../../../../lib/model/user-model";

export default class UserRepository {
  async show(param: UserShowParameter): Promise<UserModel | Empty> {
    let condition: any = { where: { active: true } };

    if (param.field == UserShowField.ID) {
      condition["where"] = { ...condition.where, id: param.value };
    }

    if (param.field == UserShowField.EMAIL) {
      condition["where"] = { ...condition.where, email: param.value };
    }

    const result = await prisma.user.findFirst({
      ...condition,
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
