export class BookNotAvailableError extends Error {
  public readonly field: string;

  constructor(message: string, field = 'livro') {
    super(message);
    this.name = 'BookNotAvailableError';
    this.field = field;
  }
}