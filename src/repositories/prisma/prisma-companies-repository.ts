import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { companiesRepository } from "../companies-repository";

export class PrismaCompaniesRepository implements companiesRepository {
    async create(data: Prisma.CompanyCreateInput) {
        const company = await prisma.company.create({
            data
        });

        return company;
    }

    async findById(id: string) {
        const company = await prisma.company.findUnique({
            where: {
                id,
            }
        });

        return company;
    }

    async findByDocument(document: string) {
        const company = await prisma.company.findUnique({
            where: {
                document,
            }
        });

        return company;
    }

    async findByName(name: string) {
        const company = await prisma.company.findUnique({
            where: {
                name,
            }
        });

        return company;
    }
}