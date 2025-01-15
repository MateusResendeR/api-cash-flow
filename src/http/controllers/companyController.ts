import { FastifyReply, FastifyRequest } from "fastify";
import { Company } from "@prisma/client";
import { RegisterCompanyUseCase } from "../../use-cases/registerCompany";
import { PrismaCompaniesRepository } from "../../repositories/prisma/prisma-companies-repository";
import { CompanyAlreadyExistsError } from "../../use-cases/errors/company-already-exists-error";
import { createCompanyValidation } from "../../validations/company-validation";

export async function createCompany (request: FastifyRequest, reply: FastifyReply) {

    const validation = createCompanyValidation.safeParse(request.body);
    if (!validation.success) {
      return reply.status(400).send({ message: 'Validation error', issues: validation.error.format() });
    }

    const { name, document, balance, status, plan } = request.body as Company;

    const balanceNumber = Number(balance);
    
    try {
        const companiesRepository = new PrismaCompaniesRepository();
        const registerCompanyUseCase = new RegisterCompanyUseCase(companiesRepository);
        await registerCompanyUseCase.handle({name, document, balance: balanceNumber, status, plan});
    } catch(error) {
        if (error instanceof CompanyAlreadyExistsError) {
            return reply.status(409).send({message: error.message});
        }

        throw error; 
    }

    return reply.status(201).send();
};