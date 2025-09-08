import type { GameRepository } from "@domain/game/contracts/GameRepository";
import { Game } from "@domain/game/Game";
import type { CreatePlayerContract } from "@domain/player/contracts/PlayerContract";
import type { PlayerRepository } from "@domain/player/contracts/PlayerRepository";
import { Player } from "@domain/player/Player";

export interface CreateGameRequest {
  password: string;
  name?: string;
  players: Omit<CreatePlayerContract, "game_id">[];
}

export class CreateGame {
  constructor(
    private gameRepository: GameRepository,
    private playerRepository: PlayerRepository
  ) {}

  async execute(request: CreateGameRequest): Promise<Game> {
    const game = Game.create({
      password: request.password,
      name: request.name,
    });

    await this.gameRepository.save(game);

    const createdPlayers: Player[] = [];
    for (const playerData of request.players) {
      const player = Player.create({
        name: playerData.name,
        target: playerData.target,
        action: playerData.action,
        game_id: game.id,
        regenerate_action_times: playerData.regenerate_action_times || 0,
      });

      await this.playerRepository.save(player);
      createdPlayers.push(player);
    }

    game.setPlayers(createdPlayers);

    return game;
  }
}
