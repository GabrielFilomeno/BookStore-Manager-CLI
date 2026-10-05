export class InvalidParamError extends Error {
  public readonly field: string;

  constructor(message: string, field: string) {
    super(message);
    this.name = 'InvalidParamError';
    this.field = field;
  }
}
