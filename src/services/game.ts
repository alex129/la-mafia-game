import { type Player, type GameAssignment, GameSchema } from "../schemas/game";
import { createGameAssignmentFile, downloadFile } from "./file";

export class GameService {
  private static shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  private static async generateAction(): Promise<string> {
    try {
      const response = await fetch("/api/generate-action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al generar la acción");
      }

      const data = await response.json();
      return data.action || "Cantar una canción de estopa";
    } catch (error) {
      console.error("Error generating action:", error);
      return "Cantar una canción de estopa";
    }
  }

  public static async createGame(players: Player[]): Promise<GameAssignment[]> {
    const result = GameSchema.safeParse({ players });

    if (!result.success) {
      throw new Error(result.error.errors.map((e) => e.message).join(", "));
    }

    if (players.length < 2) {
      throw new Error("Se necesitan al menos 2 jugadores");
    }

    // Shuffle players to assign random targets
    const shuffledPlayers = this.shuffleArray(players);
    const assignments: GameAssignment[] = [];

    // Assign targets and actions
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      // Target is the next player in the shuffled array, or the first one if we're at the end
      const targetIndex = (i + 1) % players.length;
      const target = shuffledPlayers[targetIndex];

      // Generate a unique action for this player
      const action = await this.generateAction();

      assignments.push({
        player,
        target,
        action,
        mafia: [player], // Initially, the mafia only contains the player themselves
      });

      // Create and download file for the player
      const fileUrl = createGameAssignmentFile(
        player.name,
        target.name,
        action
      );
      downloadFile(fileUrl, `mafia-game-${player.name}.txt`);
    }

    return assignments;
  }
}
