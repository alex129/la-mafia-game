export abstract class AppError extends Error {
  public readonly httpCode: number;
  public readonly name: string;

  constructor({
    message,
    httpCode,
    name,
  }: {
    message: string;
    httpCode: number;
    name: string;
  }) {
    super(message);
    this.httpCode = httpCode;
    this.name = name;
  }
}
