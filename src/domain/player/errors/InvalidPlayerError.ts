import { AppError } from "@domain/shared/AppError";

export class InvalidPlayerError extends AppError {
  constructor(message: string) {
    super({
      message: `Invalid player: ${message}`,
      httpCode: 400,
      name: "InvalidPlayerError",
    });
  }
}
