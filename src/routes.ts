import z from "zod";
import { FastifyTypedInstance } from "./types";
import { prisma } from "./lib/prisma";
import { createCompany } from "./http/controllers/companyController";


export async function routes(app: FastifyTypedInstance){
    app.get("/users", {
        schema: {
            description: "List all users",
            tags: ["users"],
            response: {
                200: z.array(z.object({
                    id: z.string(),
                    name: z.string(),
                    email: z.string(),
                })).describe("List of users")
            }
        }
    },
        () => {
        return [];
    });
    app.post("/users", {
        schema: {
            description: "Create a new user",
            tags: ["users"],
            body: z.object({
                name: z.string(),
                email: z.string().email(),
                document: z.string(),
                password: z.string(),
                level: z.string(),
                company_id: z.string(),
            }),
            response: {
                201: z.null().describe("User created"),
            }
        }
    }, async (request, reply) => {
        const { name, email, document, password, level, company_id } = request.body;

        prisma.user.create({
            data: {
                name,
                email,
                document,
                password,
                level,
                company_id
            }
        });
        return reply.status(201).send();
    });

    app.post("/company", {
        schema: {
            description: "Create a new company",
            tags: ["companies"],
            body: z.object({
                name: z.string(),
                document: z.string(),
                balance: z.number(),
                status: z.string(),
                plan: z.string(),
            }),
            response: {
                201: z.null().describe("Company created"),
            }
        }
    }, createCompany);


}