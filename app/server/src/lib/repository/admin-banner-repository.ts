import fs from "node:fs";
import { prisma } from "../helper/prisma";

export default class AdminBannerRepository {
  async index(param: Record<string, any>): Promise<Record<string, any>> {
    const skip = (param.page - 1) * param.limit;

    const result = await prisma.banner.findMany({
      orderBy: {
        created: "desc",
      },
      skip: skip,
      take: parseInt(param.limit),
    });

    const data = {
      data: result as any,
    };

    return data;
  }

  async create(param: Record<string, any>): Promise<void> {
    await prisma.banner.create({
      data: {
        id: param.id,
        name: param.name,
        description: param.description,
        picture: param.picture,
        big: true,
        active: param.status == "active",
      },
    });
  }

  async update(param: Record<string, any>): Promise<void> {
    await prisma.banner.update({
      where: { id: param.id },
      data: {
        name: param.name,
        description: param.description,
        picture: param.picture,
        active: param.status == "active",
      },
    });
  }

  async delete(param: Record<string, any>): Promise<void> {
    await prisma.$transaction(async (tx) => {
      const banner = await tx.banner.findFirst({ where: { id: param.id } });

      if (banner) {
        const filename = banner.picture.substring(
          banner.picture.lastIndexOf("/") + 1
        );

        const path = "upload/image/" + filename;

        fs.stat(path, async (err) => {
          if (!err) {
            fs.unlinkSync("upload/image/" + filename);
          }
        });

        await tx.banner.delete({
          where: { id: param.id },
        });
      }
    });
  }
}
