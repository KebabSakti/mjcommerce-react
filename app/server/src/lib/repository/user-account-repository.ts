import bcrypt from "bcryptjs";
import { UserModel } from "../../../../lib/model/user-model";
import { Result } from "../config/type";
import { prisma } from "../helper/prisma";

export default class UserRepository {
  async show(param: Record<string, any>): Promise<Result<UserModel>> {
    let condition: any = { where: { active: true } };

    if (param.hasOwnProperty("id")) {
      condition["where"] = {
        ...condition.where,
        id: param.id,
      };
    }

    if (param.hasOwnProperty("phone")) {
      condition["where"] = {
        ...condition.where,
        phone: param.phone,
      };
    }

    const result = await prisma.user.findFirst({
      ...condition,
    });

    const data = {
      data: result as any,
    };

    return data;
  }

  async create(param: Record<string, any>): Promise<Result<UserModel>> {
    const hashedPassword = await bcrypt.hash(param.password, 10);

    const result = await prisma.user.create({
      data: {
        password: hashedPassword,
        name: param.name,
        phone: param.phone,
        address: param.address,
      },
    });

    const data = {
      data: result as any,
    };

    return data;
  }

  async update(param: Record<string, any>): Promise<Result<UserModel>> {
    const result = await prisma.user.update({
      where: {
        id: param.id,
      },
      data: {
        name: param.name,
        phone: param.phone,
        address: param.address,
      },
    });

    const data = {
      data: result as any,
    };

    return data;
  }
}
