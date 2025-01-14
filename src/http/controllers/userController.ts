import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "@prisma/client";
import { create } from "../../use-cases/user";

export async function createUser (request: FastifyRequest, reply: FastifyReply) {
    const { name, document, password, email, level, company_id } = request.body as User;

    try {
        await create({name, document, password, email, level, company_id});
    } catch {
        return reply.status(409).send();
    }

    return reply.status(201).send();
};
        