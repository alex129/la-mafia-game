import type { GameRepository } from "@domain/game/contracts/GameRepository";
import { GameNotFound } from "@domain/game/errors/GameNotFound";
import bcrypt from "bcryptjs";

export interface VerifyGamePasswordRequest {
  gameId: string;
  password: string;
}

export class VerifyGamePassword {
  constructor(private gameRepository: GameRepository) {}

  async execute(request: VerifyGamePasswordRequest): Promise<boolean> {
    const game = await this.gameRepository.findById(request.gameId);

    if (!game) {
      throw new GameNotFound(request.gameId);
    }

    return await bcrypt.compare(request.password, game.password);
  }
}
