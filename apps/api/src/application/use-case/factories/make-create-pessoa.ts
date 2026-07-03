import { PessoaDrizzleRepository } from "@/db/table/PessoaDrizzleRepository";
import { CreatePessoa } from "../CreatePessoa";
import { InsightFaceEmbeddingService } from "../function/FaceApiEmbeddingService";

export function makeCreatePessoa(){
  const pessoaRepository = new PessoaDrizzleRepository()
  const faceEmbeddingService = new InsightFaceEmbeddingService()

  const createPessoa = new CreatePessoa( pessoaRepository, faceEmbeddingService)

  return createPessoa;
}