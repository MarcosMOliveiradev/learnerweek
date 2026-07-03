import type { Pessoa } from "@/application/entities/Pessoa";
import { PessoaRepository } from "@/application/repositories/PessoasRepositories";
import { db } from "../connection";
import { schema } from "../drizzle";

export class PessoaDrizzleRepository extends PessoaRepository {
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