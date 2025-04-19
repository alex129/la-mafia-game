import { type GameAssignment, GameSchema, type Player } from "../schemas/game";
import { createGame } from "./api";
import bcrypt from "bcryptjs";

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

  public static async createGame(
    players: Player[],
    password: string
  ): Promise<GameAssignment[]> {
    const result = GameSchema.safeParse({ players, password });

    if (!result.success) {
      throw new Error(result.error.errors.map((e) => e.message).join(", "));
    }

    if (players.length < 2) {
      throw new Error("Se necesitan al menos 2 jugadores");
    }

    const assignments: GameAssignment[] = [];

    let availablePlayers = [...players];
    for (const player of players) {
      const availableTargets = availablePlayers.filter((p) => p.name !== player.name);

      const targetIndex = Math.floor(Math.random() * availableTargets.length);
      const target = availableTargets[targetIndex];

      availablePlayers = availablePlayers.filter((p) => p.name !== target.name);

      const action = await this.generateAction();

      assignments.push({
        player,
        target,
        action,
        mafia: [player],
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createGame(
      assignments.map((assignment) => ({
        name: assignment.player.name,
        action: assignment.action,
        target: assignment.target.name,
      })),
      hashedPassword
    );

    return assignments;
  }

  public static async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
