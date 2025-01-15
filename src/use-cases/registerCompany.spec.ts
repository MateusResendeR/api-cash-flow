import { describe, it, expect } from "vitest";
import { RegisterCompanyUseCase } from "./registerCompany"; 
import { Decimal } from "@prisma/client/runtime/binary";
import { CompanyAlreadyExistsError } from "./errors/company-already-exists-error";

describe('Register Company Use Case', () => {
    it('should be able to register a company', async () => {
        const registerCompanyUseCase = new RegisterCompanyUseCase(
            { 
                async create(data: any): Promise<{ name: string; id: string; document: string; balance: Decimal; status: string; plan: string; created_at: Date; }> {
                    return Promise.resolve({
                        name: 'Company 1',
                        id: 'some-id',
                        document: '12345678901',
                        balance: 0, // Use Decimal type for balance
                        status: 'active',
                        plan: 'free',
                        created_at: "2025-01-15T16:44:58.499Z",
                    });
                },
                async findById(id: string){
                    return Promise.resolve(null);
                },
                async findByDocument(document: string){
                    return Promise.resolve(null);
                },
                async findByName(name: string) {
                    return Promise.resolve(null);
                },
            },
        );
    
        const {company} = await registerCompanyUseCase.handle({
            name: 'Company 1',
            document: '12345678901',
            balance: 0,
            status: 'active',
            plan: 'free'
        });
    
        expect(company).toEqual({
            id: expect.any(String),
            name: 'Company 1',
            document: '12345678901',
            balance: 0,
            status: 'active',
            plan: 'free',
            created_at: "2025-01-15T16:44:58.499Z",
        });
    });

    it('should not be able to register a company with the same document', async () => {
        const registerCompanyUseCase = new RegisterCompanyUseCase(
            { 
                async create(data: any): Promise<{ name: string; id: string; document: string; balance: Decimal; status: string; plan: string; created_at: Date; }> {
                    return Promise.resolve({
                        name: 'Company 1',
                        id: 'some-id',
                        document: '12345678901',
                        balance: 0, // Use Decimal type for balance
                        status: 'active',
                        plan: 'free',
                        created_at: "2025-01-15T16:44:58.499Z",
                    });
                },
                async findById(id: string){
                    return Promise.resolve(null);
                },
                async findByDocument(document: string){
                        return Promise.resolve({
                            name: 'Company 1',
                            id: 'some-id',  
                            document: '12345678901',
                            balance: new Decimal(0), // Use Decimal type for balance
                            status: 'active',
                            plan: 'free',
                            created_at: "2025-01-15T16:44:58.499Z",
                        });
                    },
                async findByName(name: string) {
                    return Promise.resolve(null);
                },
            },
            
        );
    
        await expect(registerCompanyUseCase.handle({
            name: 'Company 1',
            document: '12345678901',
            balance: 0,
            status: 'active',
            plan: 'free'
        })).rejects.toBeInstanceOf(CompanyAlreadyExistsError);
    });
});
