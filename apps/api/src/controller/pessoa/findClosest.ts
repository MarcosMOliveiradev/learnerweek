import { makeFindClosest } from "@/application/use-case/factories/make-find-closest";
import { FastifyReply, FastifyRequest } from "fastify";

export async function findClosestController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const file = await request.file();

  if (!file) {
    return reply.status(400).send({
      error: "File is required",
    });
  }

  if (!file.mimetype.startsWith("image/")) {
    return reply.status(400).send({
      error: "O arquivo deve ser uma imagem.",
    });
  }

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

  const buffer = await file.toBuffer();

  if (buffer.length > MAX_SIZE) {
    return reply.status(400).send({
      error: "Imagem muito grande.",
    });
  }

  try {
    const findClosest = makeFindClosest();

    const result = await findClosest.execute({
      foto: buffer,
    });

    if (!result) {
      return reply.status(404).send({
        found: false,
        message: "Pessoa não reconhecida",
      });
    }

    const pessoa = result.pessoa.toJSON();

    return reply.status(200).send({
      found: true,
      distance: result.distance,
      pessoa: {
        ...pessoa,
        foto: pessoa.foto
          ? pessoa.foto.toString("base64")
          : null,
      },
    });
  } catch (err) {
    console.error(err);

    return reply.status(500).send({
      error: "Internal Server Error",
    });
  }
}