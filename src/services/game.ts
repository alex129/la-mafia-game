import { type GameAssignment, GameSchema, type Player } from "../schemas/game";
import { createGame } from "./api";
export class GameService {
  static async generateAction(): Promise<string> {
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

    const assignments: GameAssignment[] = [];

    for (const player of players) {
      const availableTargets = [
        ...players.filter((p) => p.name !== player.name),
      ];

      const targetIndex = Math.floor(Math.random() * availableTargets.length);
      const target = availableTargets[targetIndex];

      availableTargets.splice(targetIndex, 1);

      const action = await this.generateAction();

      assignments.push({
        player,
        target,
        action,
        mafia: [player],
      });
    }

    await createGame(
      assignments.map((assignment) => ({
        name: assignment.player.name,
        action: assignment.action,
        target: assignment.target.name,
      }))
    );

    return assignments;
  }
}
