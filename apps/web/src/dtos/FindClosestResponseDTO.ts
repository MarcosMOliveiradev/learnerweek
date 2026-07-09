export interface FindClosestResponse {
  distance: number;
  found: boolean;
  pessoa: {
    foto: string | null;
    nome: string;
    areaAtuacao: string;
    descricao?: string | null | undefined;
    faceEmbedding?: number[] | undefined;
    createdAt?: Date | null | undefined;
    updatedAt?: Date | null | undefined;
    id: string;
  }
}