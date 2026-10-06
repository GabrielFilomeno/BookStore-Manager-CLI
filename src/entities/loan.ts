import { v4 as uuidv4 } from 'uuid';

export interface LoanProps {
  id?: string;
  bookId: string;
  clientId: string;
  loanDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Loan {
  private readonly _id: string;
  private _bookId: string;
  private _clientId: string;
  private _loanDate: Date;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: LoanProps) {
    this._id = props.id ?? uuidv4();
    this._bookId = props.bookId;
    this._clientId = props.clientId;
    this._loanDate = props.loanDate ?? new Date();
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  get id(): string {
    return this._id;
  }

  get bookId(): string {
    return this._bookId;
  }

  get clientId(): string {
    return this._clientId;
  }

  get loanDate(): Date {
    return this._loanDate;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  public updateBookId(bookId: string): void {
    this._bookId = bookId;
    this._updatedAt = new Date();
  }

  public updateClientId(clientId: string): void {
    this._clientId = clientId;
    this._updatedAt = new Date();
  }

  public updateLoanDate(loanDate: Date): void {
    this._loanDate = loanDate;
    this._updatedAt = new Date();
  }
}
