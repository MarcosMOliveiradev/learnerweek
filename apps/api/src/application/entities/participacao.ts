import { createId } from "@paralleldrive/cuid2";

export interface IParticipacaoProps {
    pessoaId: string,
    dataParticipacao: Date,
    presenca: boolean,
    horaReconhecimento?: Date | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
}

export interface IPessoaPersistence extends IParticipacaoProps {
  id: string
}

export class Participacao {
  private _id: string;
  private props: IParticipacaoProps;

  constructor (props: IParticipacaoProps) {
    this._id = createId(),
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null
    }
  }

  static restore(props: IPessoaPersistence) {
    const participacao = Object.create(Participacao.prototype) as Participacao

    participacao._id = props.id;
    participacao.props = {
      pessoaId: props.pessoaId,
      dataParticipacao: props.dataParticipacao,
      presenca: props.presenca,
      horaReconhecimento: props.horaReconhecimento,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt
    }
    return participacao
  }

  toJSON() {
    return {
      id: this._id,
      ...this.props
    }
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  public get id() {
    return this._id;
  }

  public get pessoaId() {
    return this.props.pessoaId
  }
  public set pessoaId(pessoaId: string) {
    this.props.pessoaId = pessoaId
    this.touch()
  }

  public get dataParticipacao() {
    return this.props.dataParticipacao
  }
  public set dataParticipacao(dataParticipacao: Date) {
    this.props.dataParticipacao = dataParticipacao
    this.touch()
  }

  public get presenca() {
    return this.props.presenca
  }
  public set presenca(presenca: boolean) {
    this.props.presenca = presenca
    this.touch()
  }

  public get horaReconhecimento() {
    return this.props.horaReconhecimento
  }
  public set horaReconhecimento(horaReconhecimento: Date | null | undefined) {
    this.props.horaReconhecimento = horaReconhecimento
    this.touch()
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}