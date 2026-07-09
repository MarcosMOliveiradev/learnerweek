import { Participacao } from "../entities/participacao";

export abstract class ParticipacaoRepository {
  abstract create(participacao: Participacao): Promise<void>;
}