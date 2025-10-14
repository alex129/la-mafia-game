// Shared utility functions

/**
 * Format duration in seconds to human readable string
 * @param seconds - Duration in seconds
 * @returns Formatted string (e.g., "2h 30m")
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

/**
 * Check if a game is expired
 * @param startedAt - Game start timestamp
 * @param duration - Game duration in seconds
 * @returns true if game is expired
 */
export function isGameExpired(startedAt: Date, duration: number): boolean {
  const now = new Date();
  const endTime = new Date(startedAt.getTime() + duration * 1000);
  return now > endTime;
}

/**
 * Get remaining time for a game
 * @param startedAt - Game start timestamp
 * @param duration - Game duration in seconds
 * @returns Remaining seconds (0 if expired)
 */
export function getRemainingTime(startedAt: Date, duration: number): number {
  const now = new Date();
  const endTime = new Date(startedAt.getTime() + duration * 1000);
  const remaining = Math.floor((endTime.getTime() - now.getTime()) / 1000);
  return Math.max(0, remaining);
}

/**
 * Generate a random game password
 * @param length - Password length (default: 6)
 * @returns Random alphanumeric password
 */
export function generateGamePassword(length: number = 6): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed ambiguous chars
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}
