"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../helper/prisma");
class UserStoreRepository {
    async show(param) {
        const result = await prisma_1.prisma.store.findFirst({
            where: { active: true, userId: param.userId },
        });
        const data = {
            data: result,
        };
        return data;
    }
}
exports.default = UserStoreRepository;
