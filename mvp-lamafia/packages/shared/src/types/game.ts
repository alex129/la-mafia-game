export enum GameStatus {
  SETUP = 'SETUP',
  READY = 'READY',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

export interface Game {
  id: string;
  password: string;
  duration: number; // in seconds
  status: GameStatus;
  gameMasterId: string;
  selectedCategories: string[];
  startedAt: Date | null;
  endedAt: Date | null;
  winnerId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface GameDetails extends Game {
  gameMaster: {
    id: string;
    name: string | null;
    avatar: string | null;
  };
  players: Array<{
    id: string;
    userId: string;
    userName: string | null;
    userAvatar: string | null;
  }>;
  playerCount: number;
}

export type GameCreateInput = {
  password: string;
  duration: number;
  selectedCategories: string[];
};

export type GameJoinInput = {
  gameId: string;
  password: string;
};
