import type { FaceEmbeddingService } from "../entities/FaceEmbeddingService";
import { Participacao } from "../entities/participacao";
import { Pessoa, type IPessoaProps } from "../entities/Pessoa";
import { ParticipacaoRepository } from "../repositories/ParticipacaoRepository";
import type { PessoaRepository } from "../repositories/PessoasRepositories";

export class CreatePessoa {
  constructor(
    private pessoaRepository: PessoaRepository,
    private faceEmbeddingService: FaceEmbeddingService,
    private participacaoRepository: ParticipacaoRepository
  ) {}

  async execute(dados: IPessoaProps, datasPaticipacao: Date[]) {
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

    for (const data of datasPaticipacao) {
      const participacao = new Participacao({
        pessoaId: pessoa.id,
        dataParticipacao: data,
        presenca: false
      })
      await this.participacaoRepository.create(participacao)
    }

    return pessoa;
  }
}