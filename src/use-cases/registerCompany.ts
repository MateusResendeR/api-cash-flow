import { Company } from "@prisma/client";
import { companiesRepository } from "../repositories/companies-repository";
import { CompanyAlreadyExistsError } from "./errors/company-already-exists-error";

interface CompanyInterface {
    name: string;
    document: string;
    balance: number;
    status: string;
    plan: string;
}

interface RegisterCompany {
    company: Company
}
export class RegisterCompanyUseCase {
    constructor(private companiesRepository: companiesRepository) {}
    async handle({name, document, balance, status, plan}:CompanyInterface) : Promise<RegisterCompany> {

        const companyWithSameDocument = await this.companiesRepository.findByDocument(document);
        const companyWithSameName= await this.companiesRepository.findByName(name);


        if (companyWithSameDocument || companyWithSameName) {
            throw new CompanyAlreadyExistsError();
        }
    
        const company = await this.companiesRepository.create({
            name,
            document,
            balance,
            status,
            plan
        });
    
        return {company};
    }
}