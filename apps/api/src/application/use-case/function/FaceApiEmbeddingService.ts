import type { FaceEmbeddingService } from "@/application/entities/FaceEmbeddingService";

export class InsightFaceEmbeddingService
implements FaceEmbeddingService {

    async generate(image: Buffer): Promise<number[]> {

        // chama a IA

        return embedding;
    }

}