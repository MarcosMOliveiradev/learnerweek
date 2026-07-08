export interface FindClosestResponse {
  pessoa: {
    id: string;
    nome: string;
    areaAtuacao: string;
    descricao: string | null;
    foto: string | null;
  };

  distance: number;
}