export class InvalidNameError extends Error {
  public readonly field: string;

  constructor(message: string, field = 'nome') {
    super(message);
    this.name = 'InvalidNameError';
    this.field = field;
  }
}