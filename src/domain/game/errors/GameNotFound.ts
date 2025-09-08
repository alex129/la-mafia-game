import { AppError } from "@domain/shared/AppError";

export class GameNotFound extends AppError {
  constructor(gameId?: string) {
    super({
      message: gameId ? `Game with ID ${gameId} not found` : "Game not found",
      httpCode: 404,
      name: "GameNotFound",
    });
  }
}
