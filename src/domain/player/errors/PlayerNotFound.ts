import { AppError } from "@domain/shared/AppError";

export class PlayerNotFound extends AppError {
  constructor(playerId?: string) {
    super({
      message: playerId
        ? `Player with ID ${playerId} not found`
        : "Player not found",
      httpCode: 404,
      name: "PlayerNotFound",
    });
  }
}
