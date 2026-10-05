import { v4 as uuidv4 } from 'uuid';
export interface BookProps {
  id?: string;
  authorId: string;
  title: string;
  genre: string;
  description?: string | null;
  releaseDate: Date;
  total_quantity: number;
  available_quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export class Book {
  private readonly _id: string;
  private _authorId: string;
  private _title: string;
  private _genre: string;
  private _description?: string | null;
  private _releaseDate: Date;
  private _totalQuantity: number;
  private _availableQuantity: number;
  private readonly _createdAt: Date;
  private _updatedAt: Date;
  constructor(props: BookProps) {
    this._id = props.id ?? uuidv4();
    this._authorId = props.authorId;
    this._title = props.title;
    this._genre = props.genre;
    this._description = props.description ?? null;
    this._releaseDate = props.releaseDate;
    this._totalQuantity = props.total_quantity;
    this._availableQuantity = props.available_quantity;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }
  get id(): string {
    return this._id;
  }
  get authorId(): string {
    return this._authorId;
  }
  get title(): string {
    return this._title;
  }
  get genre(): string {
    return this._genre;
  }
  get description(): string | null | undefined {
    return this._description;
  }
  get releaseDate(): Date {
    return this._releaseDate;
  }
  get total_quantity(): number {
    return this._totalQuantity;
  }

  get available_quantity(): number {
    return this._availableQuantity;
  }
  get availableQuantity(): number {
    return this._availableQuantity;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }
  public updateTitle(title: string): void {
    this._title = title;
    this._updatedAt = new Date();
  }
  public updateGenre(genre: string): void {
    this._genre = genre;
    this._updatedAt = new Date();
  }
  public updateDescription(description?: string | null): void {
    this._description = description ?? null;
    this._updatedAt = new Date();
  }
  public updateReleaseDate(releaseDate: Date): void {
    this._releaseDate = releaseDate;
    this._updatedAt = new Date();
  }
  public updateAuthorId(authorId: string): void {
    this._authorId = authorId;
    this._updatedAt = new Date();
  }
  public setTotalQuantity(quantity: number): void {
    this._totalQuantity = quantity;
    this._updatedAt = new Date();
  }
  public setAvailableQuantity(quantity: number): void {
    this._availableQuantity = quantity;
    this._updatedAt = new Date();
  }
}