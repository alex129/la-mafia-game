import type { Game, Player } from "./supabase";

export async function getGames(): Promise<Game[]> {
  const response = await fetch("/api/games");
  const data = await response.json();
  return data.games;
}

export async function getGame(id: string): Promise<Game> {
  const response = await fetch(`/api/games/${id}`);
  const data = await response.json();
  return data.game;
}

export async function getPlayer(id: string): Promise<Player> {
  const response = await fetch(`/api/players/${id}`);
  const data = await response.json();
  return data.player;
}

export async function createGame(
  players: Omit<Player, "id" | "game_id">[],
  password: string
): Promise<Game> {
  const response = await fetch("/api/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ players, password }),
  });
  const data = await response.json();
  return data.game;
}

export async function cleanupGames(): Promise<boolean> {
  try {
    const response = await fetch("/api/games/cleanup", {
      method: "POST",
    });
    return response.ok;
  } catch (error) {
    console.error("Error cleaning up games:", error);
    return false;
  }
}

export async function verifyGamePassword(
  gameId: string,
  password: string
): Promise<boolean> {
  const response = await fetch(`/api/games/${gameId}/verify-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });
  const data = await response.json();
  return data.verified;
}
