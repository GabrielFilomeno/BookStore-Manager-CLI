import { v4 as uuidv4 } from 'uuid';

export interface AuthorProps {
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Author {
  private readonly _id: string;
  private _name: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: AuthorProps) {

    this._id = props.id ?? uuidv4();
    this._name = props.name;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
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
}
