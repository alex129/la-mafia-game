import { Serializable } from "@domain/shared/Serializable";
import Uuid from "@domain/shared/Uuid";
import type {
  GameContract,
  CreateGameContract,
} from "@domain/game/contracts/GameContract";
import { Player } from "@domain/player/Player";

export class Game extends Serializable {
  private readonly id_value: Uuid;
  public name: string;
  public created_at: Date;
  public password: string;
  private _players: Player[] = [];

  constructor({
    id,
    name,
    created_at,
    password,
    players = [],
  }: {
    id?: string;
    name?: string;
    created_at?: Date;
    password: string;
    players?: Player[];
  }) {
    super();
    this.id_value = new Uuid(id);
    this.name = name || `Game-${this.id_value.getValue().slice(0, 8)}`;
    this.created_at = created_at ?? new Date();
    this.password = password;
    this._players = players;
  }

  static create({ password, name }: CreateGameContract): Game {
    return new Game({
      password,
      name,
    });
  }

  static fromPrimitives(primitives: GameContract & { players?: any[] }): Game {
    const players =
      primitives.players?.map((playerData) =>
        Player.fromPrimitives(playerData)
      ) || [];

    return new Game({
      id: primitives.id,
      name: primitives.name,
      created_at: primitives.created_at,
      password: primitives.password,
      players,
    });
  }

  get id(): string {
    return this.id_value.getValue();
  }

  get players(): Player[] {
    return [...this._players];
  }

  addPlayer(player: Player): void {
    if (this._players.find((p) => p.name === player.name)) {
      throw new Error(
        `Player with name ${player.name} already exists in this game`
      );
    }
    this._players.push(player);
  }

  removePlayer(playerId: string): void {
    this._players = this._players.filter((p) => p.id !== playerId);
  }

  getPlayerCount(): number {
    return this._players.length;
  }

  hasMinimumPlayers(): boolean {
    return this._players.length >= 2;
  }

  setPlayers(players: Player[]): void {
    this._players = players;
  }

  toPrimitives(): GameContract & { players: any[] } {
    return {
      id: this.id,
      name: this.name,
      created_at: this.created_at,
      password: this.password,
      players: this._players.map((player) => player.toPrimitives()),
    };
  }
}
