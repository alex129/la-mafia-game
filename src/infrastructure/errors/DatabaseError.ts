import { AppError } from "@domain/shared/AppError";

export class DatabaseError extends AppError {
  constructor(message: string) {
    super({
      message: `Database error: ${message}`,
      httpCode: 500,
      name: "DatabaseError",
    });
  }
}
