import { Company, Prisma } from "@prisma/client";

export interface companiesRepository {
    create: (data: Prisma.CompanyCreateInput) => Promise<Company>;
    findById: (id: string) => Promise<Company | null>;
    findByDocument: (document: string) => Promise<Company | null>;
    findByName: (name: string) => Promise<Company | null>;
}