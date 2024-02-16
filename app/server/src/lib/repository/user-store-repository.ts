import { prisma } from "../helper/prisma";

export default class UserStoreRepository {
  async show(param: Record<string, any>): Promise<Record<string, any>> {
    const result = await prisma.store.findFirst({
      where: { active: true, userId: param.userId },
    });

    const data = {
      data: result,
    };

    return data;
  }
}
