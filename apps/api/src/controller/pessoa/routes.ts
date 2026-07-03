import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { createPessoa } from "./createPessoa";

export async function pessoaRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/criarpessoa', async (request, reply) => {
    return createPessoa(request, reply);
  });
}