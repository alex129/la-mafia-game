import type { GameRepository } from "@domain/game/contracts/GameRepository";

export class CleanupOldGames {
  constructor(private gameRepository: GameRepository) {}

  async execute(): Promise<void> {
    await this.gameRepository.cleanup();
  }
}
