import { Serializable } from "@domain/shared/Serializable";
import Uuid from "@domain/shared/Uuid";
import type {
  PlayerContract,
  CreatePlayerContract,
} from "@domain/player/contracts/PlayerContract";

export class Player extends Serializable {
  private readonly id_value: Uuid;
  public name: string;
  public target: string;
  public action: string;
  public game_id: string;
  public regenerate_action_times: number;

  constructor({
    id,
    name,
    target,
    action,
    game_id,
    regenerate_action_times = 0,
  }: {
    id?: string;
    name: string;
    target: string;
    action: string;
    game_id: string;
    regenerate_action_times?: number;
  }) {
    super();
    this.id_value = new Uuid(id);
    this.name = name;
    this.target = target;
    this.action = action;
    this.game_id = game_id;
    this.regenerate_action_times = regenerate_action_times;
  }

  static create({
    name,
    target,
    action,
    game_id,
    regenerate_action_times = 0,
  }: CreatePlayerContract): Player {
    return new Player({
      name,
      target,
      action,
      game_id,
      regenerate_action_times,
    });
  }

  static fromPrimitives(primitives: PlayerContract): Player {
    return new Player({
      id: primitives.id,
      name: primitives.name,
      target: primitives.target,
      action: primitives.action,
      game_id: primitives.game_id,
      regenerate_action_times: primitives.regenerate_action_times || 0,
    });
  }

  get id(): string {
    return this.id_value.getValue();
  }

  updateAction(newAction: string): void {
    this.action = newAction;
  }

  updateTarget(newTarget: string): void {
    this.target = newTarget;
  }

  incrementRegenerateActionTimes(): void {
    this.regenerate_action_times += 1;
  }

  canRegenerateAction(maxTimes: number = 3): boolean {
    return this.regenerate_action_times < maxTimes;
  }

  belongsToGame(gameId: string): boolean {
    return this.game_id === gameId;
  }

  toPrimitives(): PlayerContract {
    return {
      id: this.id,
      name: this.name,
      target: this.target,
      action: this.action,
      game_id: this.game_id,
      regenerate_action_times: this.regenerate_action_times,
    };
  }
}
