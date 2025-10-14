export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  locale: string;
  isPremium: boolean;
  premiumSince: Date | null;
  rerollsAvailable: number;
  unlockedCategories: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  gamesPlayed: number;
  gamesWon: number;
  totalRecruitments: number;
}

export type UserCreateInput = {
  email: string;
  name?: string;
  avatar?: string;
  googleId?: string;
  locale?: string;
};

export type UserUpdateInput = Partial<Omit<User, 'id' | 'email' | 'createdAt' | 'updatedAt'>>;
