export enum RecruitmentStatus {
  NONE = 'NONE',
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  DENIED = 'DENIED',
}

export interface Player {
  id: string;
  userId: string;
  gameId: string;
  targetId: string | null;
  actionId: string | null;
  mafiaId: string | null;
  rerollsUsed: number;
  previousActions: string[];
  recruitmentStatus: RecruitmentStatus;
  recruitedBy: string | null;
  recruitedAt: Date | null;
  joinedAt: Date;
}

export interface PlayerWithDetails extends Player {
  user: {
    id: string;
    name: string | null;
    avatar: string | null;
  };
  target?: {
    id: string;
    name: string | null;
  };
  action?: {
    id: string;
    text: string;
    category: string;
  };
  mafia?: {
    id: string;
    name: string;
    memberCount: number;
  };
}
