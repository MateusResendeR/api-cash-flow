import { hash } from "bcryptjs";
import { prisma } from "../lib/prisma";
import { PrismaUsersRepository } from "../repositories/prisma-users-repository";
import { PrismaCompaniesRepository } from "../repositories/prisma/prisma-companies-repository";

interface UserInterface {
    name: string;
    email: string;
    document: string;
    password: string;
    level: string;
    company_id: string;
}

export async function create({name, email, document, password, level, company_id}:UserInterface) {
    const passwordHash = await hash(password, 6); 
        
        const userWithSameEmail = await prisma.user.findUnique({
            where: {
                email,
            }
        });
    
        if (userWithSameEmail) {
            throw new Error('User already exists');
        }
    
        const prismaUsersRepository = new PrismaUsersRepository();
        const prismaCompaniesRepository = new PrismaCompaniesRepository();

        const company = await prismaCompaniesRepository.find({ where: { id: company_id } });

        await prismaUsersRepository.create({
            name,
            email,
            document,
            password: passwordHash,
            level,
            company: company ?? { id: company_id },
        })
} 