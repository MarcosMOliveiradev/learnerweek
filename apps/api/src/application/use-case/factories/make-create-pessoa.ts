import { PessoaDrizzleRepository } from "@/db/table/PessoaDrizzleRepository";
import { CreatePessoa } from "../CreatePessoa";
import { InsightFaceEmbeddingService } from "../function/FaceApiEmbeddingService";
import { ParticipacaoDrizzleRepository } from "@/db/table/ParticipacaoDrizzleRepository";

export function makeCreatePessoa(){
  const pessoaRepository = new PessoaDrizzleRepository()
  const partcipacaoRepository = new ParticipacaoDrizzleRepository()
  const faceEmbeddingService = new InsightFaceEmbeddingService()

  const createPessoa = new CreatePessoa( pessoaRepository, faceEmbeddingService, partcipacaoRepository)

  return createPessoa;
}