export interface PlayerContract {
  id: string;
  name: string;
  target: string;
  action: string;
  game_id: string;
  regenerate_action_times?: number;
}

export type CreatePlayerContract = Partial<PlayerContract> &
  Required<Pick<PlayerContract, "name" | "target" | "action" | "game_id">>;

export type UpdatePlayerContract = Partial<PlayerContract> &
  Required<Pick<PlayerContract, "id">>;
