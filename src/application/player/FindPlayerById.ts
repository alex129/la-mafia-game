import type { PlayerRepository } from "@domain/player/contracts/PlayerRepository";
import { Player } from "@domain/player/Player";
import { PlayerNotFound } from "@domain/player/errors/PlayerNotFound";

export class FindPlayerById {
  constructor(private playerRepository: PlayerRepository) {}

  async execute(playerId: string): Promise<Player> {
    const player = await this.playerRepository.findById(playerId);

    if (!player) {
      throw new PlayerNotFound(playerId);
    }

    return player;
  }
}
