import { Game } from "@domain/game/Game";
import { Player } from "@domain/player/Player";

export interface GameRepository {
  save(game: Game): Promise<void>;
  findById(id: string): Promise<Game | null>;
  findAll(): Promise<Game[]>;
  delete(id: string): Promise<void>;
  findByIdWithPlayers(id: string): Promise<Game | null>;
  cleanup(): Promise<void>;
}
