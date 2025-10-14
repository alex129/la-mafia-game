// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// ============================================
// Authentication
// ============================================

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string | null;
    avatar: string | null;
    isPremium: boolean;
  };
  tokens: AuthTokens;
}

// ============================================
// WebSocket Events
// ============================================

export enum WebSocketEvent {
  GAME_STARTED = 'game:started',
  GAME_ENDED = 'game:ended',
  PLAYER_JOINED = 'player:joined',
  PLAYER_RECRUITED = 'player:recruited',
  VERIFICATION_REQUEST = 'verification:request',
  MAFIA_UPDATED = 'mafia:updated',
  NOTIFICATION = 'notification',
}

export interface WebSocketMessage<T = any> {
  event: WebSocketEvent;
  data: T;
  timestamp: string;
}
