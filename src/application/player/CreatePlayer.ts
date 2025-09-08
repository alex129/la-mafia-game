import type { PlayerRepository } from "@domain/player/contracts/PlayerRepository";
import { Player } from "@domain/player/Player";
import type { CreatePlayerContract } from "@domain/player/contracts/PlayerContract";

export class CreatePlayer {
  constructor(private playerRepository: PlayerRepository) {}

  async execute(playerData: CreatePlayerContract): Promise<Player> {
    const player = Player.create(playerData);

    await this.playerRepository.save(player);

    return player;
  }
}
