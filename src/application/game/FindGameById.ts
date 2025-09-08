import type { GameRepository } from "@domain/game/contracts/GameRepository";
import { Game } from "@domain/game/Game";
import { GameNotFound } from "@domain/game/errors/GameNotFound";

export class FindGameById {
  constructor(private gameRepository: GameRepository) {}

  async execute(gameId: string): Promise<Game> {
    const game = await this.gameRepository.findById(gameId);

    if (!game) {
      throw new GameNotFound(gameId);
    }

    return game;
  }
}
