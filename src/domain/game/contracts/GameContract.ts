export interface GameContract {
  id: string;
  name: string;
  created_at: Date;
  password: string;
}

export type CreateGameContract = Partial<GameContract> &
  Required<Pick<GameContract, "password">> & {
    name?: string;
  };

export type UpdateGameContract = Partial<GameContract> &
  Required<Pick<GameContract, "id">>;
