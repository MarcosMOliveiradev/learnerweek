import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { createPessoa } from "./createPessoa";
import { findClosestController } from "./findClosest";

export async function pessoaRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/criarpessoa', async (request, reply) => {
    return await createPessoa(request, reply);
  });

  app.withTypeProvider<ZodTypeProvider>().post('/findclosest', async (request, reply) => {
    return await findClosestController(request, reply)
  })
}