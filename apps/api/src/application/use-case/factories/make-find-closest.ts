import { PessoaDrizzleRepository } from "@/db/table/PessoaDrizzleRepository";
import { InsightFaceEmbeddingService } from "../function/FaceApiEmbeddingService";
import { FindClosest } from "../FindClosest";

export function makeFindClosest(){
  const pessoaRepository = new PessoaDrizzleRepository()
  const faceEmbeddingService = new InsightFaceEmbeddingService()

  const findClosest = new FindClosest( pessoaRepository, faceEmbeddingService)

  return findClosest;
}