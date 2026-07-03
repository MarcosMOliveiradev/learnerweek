import { createId } from "@paralleldrive/cuid2"

export interface IPessoaProps {
  nome: string,
  areaAtuacao: string,
  descricao?: string | null,
  foto?: Buffer | null,
  faceEmbedding?: number[],
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface IPessoaPersistence extends IPessoaProps {
  id: string,
}

export class Pessoa {
  private _id: string;
  private props: IPessoaProps;

  constructor(props: IPessoaProps) {
    this._id = createId()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null
    }
  }

  static restore(props: IPessoaPersistence) {
    const pessoa = Object.create(Pessoa.prototype) as Pessoa;

    pessoa._id = props.id;
    pessoa.props = {
      nome: props.nome,
      areaAtuacao: props.areaAtuacao,
      descricao: props.descricao,
      foto: props.foto,
      faceEmbedding: props.faceEmbedding,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt ?? null
    }
    return pessoa;
  }

  toJSON() {
    return {
        id: this.id,
        ...this.props
    }
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  public get id() {
    return this._id;
  }

  public get nome() {
    return this.props.nome;
  }
  public set nome(nome: string) {
    this.props.nome = nome;
    this.touch();
  }

  public get areaAtuacao() {
    return this.props.areaAtuacao;
  }
  public set areaAtuacao(areaAtuacao: string) {
    this.props.areaAtuacao = areaAtuacao;
    this.touch();
  }

  public get descricao() {
    return this.props.descricao;
  }
  public set descricao(descricao: string | null | undefined) {
    this.props.descricao = descricao ?? null;
    this.touch();
  }

  public get foto() {
    return this.props.foto;
  }
  registrarFoto(buffer: Buffer) {
    this.props.foto = buffer;
    this.touch();
  }  

  public get faceEmbedding() {
    return this.props.faceEmbedding;
  }
  registrarEmbedding(embedding: number[]) {
    this.props.faceEmbedding = embedding;
    this.touch();
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}