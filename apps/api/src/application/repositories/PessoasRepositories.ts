import type { Pessoa } from "../entities/Pessoa";

export abstract class PessoaRepository {
  abstract create(pessoa: Pessoa): Promise<void>;
  abstract findById(id: string): Promise<Pessoa | null>;
  abstract findAll(): Promise<Pessoa[]>;
  abstract update(pessoa: Pessoa): Promise<void>;
  abstract delete(id: string): Promise<void>;
}