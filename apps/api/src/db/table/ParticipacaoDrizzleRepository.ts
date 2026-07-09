import { Participacao } from "@/application/entities/participacao";
import { ParticipacaoRepository } from "@/application/repositories/ParticipacaoRepository";
import { db } from "../connection";
import { schema } from "../drizzle";

export class ParticipacaoDrizzleRepository extends ParticipacaoRepository {
  async create(participacao: Participacao): Promise<void> {
    await db.insert(schema.participacao).values({
      id: participacao.id,
      pessoaId: participacao.pessoaId,
      dataParticipacao: participacao.dataParticipacao,
      presenca: participacao.presenca,
      createdAt: participacao.createdAt
    })
  }
}