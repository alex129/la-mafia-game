export enum ChallengeStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  REJECTED = 'REJECTED',
  ARCHIVED = 'ARCHIVED',
}

export interface Challenge {
  id: string;
  textEs: string;
  textEn: string;
  categoryId: string;
  isUserGenerated: boolean;
  creatorId: string | null;
  status: ChallengeStatus;
  difficulty: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  isFree: boolean;
  price: number | null;
  isActive: boolean;
  nameEn: string | null;
  nameEs: string | null;
  descriptionEn: string | null;
  descriptionEs: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type ChallengeCreateInput = {
  textEs: string;
  textEn: string;
  categoryId: string;
  difficulty?: number;
};
