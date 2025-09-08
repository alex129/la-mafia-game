import { Player } from "@domain/player/Player";

export interface PlayerRepository {
  save(player: Player): Promise<void>;
  findById(id: string): Promise<Player | null>;
  findByGameId(gameId: string): Promise<Player[]>;
  updateAction(id: string, action: string): Promise<void>;
  delete(id: string): Promise<void>;
  incrementRegenerateActionTimes(id: string): Promise<void>;
}
