import z from "zod";
import { FastifyTypedInstance } from "./types";
import { createCompany } from "./http/controllers/companyController";
import { createCompanyValidation } from "./validations/company-validation";


export async function routes(app: FastifyTypedInstance){
    app.post("/company", {
        schema: {
            description: "Create a new company",
            tags: ["companies"],
            body: createCompanyValidation,
            response: {
                201: z.null().describe("Company created"),
            },
            validate: false,
        },
    }, createCompany);
}