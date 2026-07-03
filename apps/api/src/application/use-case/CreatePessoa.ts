import type { FaceEmbeddingService } from "../entities/FaceEmbeddingService";
import { Pessoa, type IPessoaProps } from "../entities/Pessoa";
import type { PessoaRepository } from "../repositories/PessoasRepositories";

export class CreatePessoa {
  constructor(
    private pessoaRepository: PessoaRepository,
    private faceEmbeddingService: FaceEmbeddingService
  ) {}

  async execute(dados: IPessoaProps) {
    let embedding: number[] | undefined;

    if (dados.foto) {
      embedding = await this.faceEmbeddingService.generate(dados.foto);
    }
    
    const pessoa = new Pessoa({
      nome: dados.nome,
      areaAtuacao: dados.areaAtuacao,
      descricao: dados.descricao,
      foto: dados.foto,
      faceEmbedding: embedding
    });
    await this.pessoaRepository.create(pessoa);

    return pessoa;
  }
}