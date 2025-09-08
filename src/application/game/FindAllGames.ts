import type { GameRepository } from "@domain/game/contracts/GameRepository";
import { Game } from "@domain/game/Game";

export class FindAllGames {
  constructor(private gameRepository: GameRepository) {}

  async execute(): Promise<Game[]> {
    return await this.gameRepository.findAll();
  }
}
