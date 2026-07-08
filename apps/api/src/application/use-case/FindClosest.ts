import { FaceEmbeddingService } from "../entities/FaceEmbeddingService";
import { Pessoa } from "../entities/Pessoa";
import { PessoaRepository } from "../repositories/PessoasRepositories";

export interface FindClosestRequest {
  foto: Buffer;
}

export interface FindClosestResponse {
  found: boolean;
  pessoa: Pessoa;
  distance: number;
}

export class FindClosest {
  constructor(
    private pessoaRepository: PessoaRepository,
    private embeddingService: FaceEmbeddingService,
  ) {}

  async execute({
    foto,
  }: FindClosestRequest): Promise<FindClosestResponse | null> {

    // 1. Gera o embedding
    const embedding = await this.embeddingService.generate(foto);

    // 2. Procura no banco
    const result = await this.pessoaRepository.findClosest(embedding);

    if (!result) {
      return {
        found: false,
      };
    }

    // 3. Define um limite de aceitação
    if (result.distance > 0.6) {
      return {
        found: false
      };
    }

    return {
      found: true,
      pessoa: result.pessoa,
      distance: result.distance,
    };
  }
}