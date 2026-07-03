export interface FaceEmbeddingService {
  generate(image: Buffer): Promise<number[]>;
}