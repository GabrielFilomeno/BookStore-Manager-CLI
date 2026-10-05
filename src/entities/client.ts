import { v4 as uuidv4 } from 'uuid';

export interface ClientProps {
  id?: string;
  name: string;
  cpf: string;
  address?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Client {
  private readonly _id: string;
  private _name: string;
  private _cpf: string;
  private _address?: string | null;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: ClientProps) {
    this._id = props.id ?? uuidv4();
    this._name = props.name;
    this._cpf = props.cpf;
    this._address = props.address ?? null;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get cpf(): string {
    return this._cpf;
  }

  get address(): string | null | undefined {
    return this._address;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  public updateName(name: string): void {
    this._name = name;
    this._updatedAt = new Date();
  }

  public updateCpf(cpf: string): void {
    this._cpf = cpf;
    this._updatedAt = new Date();
  }

  public updateAddress(address?: string | null): void {
    this._address = address ?? null;
    this._updatedAt = new Date();
  }
}
