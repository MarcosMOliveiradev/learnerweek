import { makeCreatePessoa } from "@/application/use-case/factories/make-create-pessoa";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function createPessoa(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const pessoaSchema = z.object({
    nome: z.string(),
    areaAtuacao: z.string(),
    descricao: z.string().optional(),
  })

  
  const file = await request.file();
  if(!file) {
    return reply.status(400).send({ error: "File is required" });
  }
  if (!file.mimetype.startsWith("image/")) {
    return reply.status(400).send({
      error: "O arquivo deve ser uma imagem."
    });
  }

  const body = {
    nome: file.fields.nome?.value,
    areaAtuacao: file.fields.areaAtuacao?.value,
    descricao: file.fields.descricao?.value,
  }

  const { nome, areaAtuacao, descricao } = pessoaSchema.parse(body);
  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

  const buffer = await file.toBuffer();

  if (buffer.length > MAX_SIZE) {
    return reply.status(400).send({
      error: "Imagem muito grande."
    });
  }

  try {
    const createPessoa = makeCreatePessoa();
    const pessoa = await createPessoa.execute({
      nome,
      areaAtuacao,
      descricao,
      foto: buffer
    })

    return reply.status(201).send(pessoa);
  } catch (err) {
    return reply.status(500).send({ err });
  }
}