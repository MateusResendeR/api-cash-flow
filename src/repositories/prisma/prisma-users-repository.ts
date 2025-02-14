import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class PrismaUsersRepository {
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        });

        return user;
    }
}