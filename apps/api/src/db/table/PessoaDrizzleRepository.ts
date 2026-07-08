import { sql } from "drizzle-orm"
import { Pessoa } from "@/application/entities/Pessoa";
import { PessoaRepository } from "@/application/repositories/PessoasRepositories";
import { db } from "../connection";
import { schema } from "../drizzle";

export class PessoaDrizzleRepository extends PessoaRepository {
  async findClosest(
    embedding: number[]
  ): Promise<{ pessoa: Pessoa; distance: number } | null> {
    const vector = `[${embedding.join(",")}]`;

    const distance = sql<number>`
      ${schema.pessoas.faceEmbedding} <=> CAST(${vector} AS vector)
    `;

    const [result] = await db
      .select({
        pessoa: schema.pessoas,
        distance: distance.as("distance"),
      })
      .from(schema.pessoas)
      .orderBy(distance)
      .limit(1);

    if (!result) {
      return null;
    }

    return {
      pessoa: Pessoa.restore({
        id: result.pessoa.id,
        nome: result.pessoa.name,
        areaAtuacao: result.pessoa.areaAtuacao,
        descricao: result.pessoa.descricao,
        foto: result.pessoa.foto,
        faceEmbedding: result.pessoa.faceEmbedding ?? undefined,
        createdAt: result.pessoa.createdAt,
        updatedAt: result.pessoa.updatedAt,
      }),
      distance: result.distance,
    };
  }

  async create(pessoa: Pessoa): Promise<void> {
    await db.insert(schema.pessoas).values({
      id: pessoa.id,
      name: pessoa.nome,
      areaAtuacao: pessoa.areaAtuacao,
      descricao: pessoa.descricao,
      foto: pessoa.foto,
      faceEmbedding: pessoa.faceEmbedding,
      createdAt: pessoa.createdAt,
      updatedAt: pessoa.updatedAt,
    })
  }
  findById(id: string): Promise<Pessoa | null> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Pessoa[]> {
    throw new Error("Method not implemented.");
  }
  update(pessoa: Pessoa): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}