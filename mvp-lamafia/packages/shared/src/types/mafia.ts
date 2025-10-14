export interface Mafia {
  id: string;
  name: string;
  leaderId: string;
  gameId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MafiaWithMembers extends Mafia {
  members: Array<{
    id: string;
    userId: string;
    userName: string | null;
    userAvatar: string | null;
    recruitedAt: Date | null;
  }>;
  memberCount: number;
}
