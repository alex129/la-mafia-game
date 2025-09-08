import type { PlayerRepository } from "@domain/player/contracts/PlayerRepository";
import { Player } from "@domain/player/Player";
import { PlayerNotFound } from "@domain/player/errors/PlayerNotFound";
import { InvalidPlayerError } from "@domain/player/errors/InvalidPlayerError";

export interface UpdatePlayerActionRequest {
  playerId: string;
  newAction: string;
  maxRegenerateAttempts?: number;
}

export class UpdatePlayerAction {
  constructor(private playerRepository: PlayerRepository) {}

  async execute(request: UpdatePlayerActionRequest): Promise<Player> {
    const maxAttempts = request.maxRegenerateAttempts || 5;

    const player = await this.playerRepository.findById(request.playerId);

    if (!player) {
      throw new PlayerNotFound(request.playerId);
    }

    if (!player.canRegenerateAction(maxAttempts)) {
      throw new InvalidPlayerError(
        "You have reached the maximum number of attempts"
      );
    }

    player.updateAction(request.newAction);
    player.incrementRegenerateActionTimes();

    await this.playerRepository.save(player);

    return player;
  }
}
