import { AppError } from "@domain/shared/AppError";

export class InvalidGameError extends AppError {
  constructor(message: string) {
    super({
      message: `Invalid game: ${message}`,
      httpCode: 400,
      name: "InvalidGameError",
    });
  }
}
