import { Participacao } from "@/application/entities/participacao";
import { ParticipacaoRepository } from "@/application/repositories/ParticipacaoRepository";
import { db } from "../connection";
import { schema } from "../drizzle";

function toDateOnly(date: Date): string {
  return date.toISOString().split("T")[0];
}

export class ParticipacaoDrizzleRepository extends ParticipacaoRepository {
  async create(participacao: Participacao): Promise<void> {
    await db.insert(schema.participacao).values({
      id: participacao.id,
      pessoaId: participacao.pessoaId,
      dataParticipacao: toDateOnly(participacao.dataParticipacao),
      presenca: participacao.presenca,
      createdAt: participacao.createdAt
    })
  }
}