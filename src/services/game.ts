import { type GameAssignment, GameSchema, type Player } from "../schemas/game";
import { createGame } from "./api";
import bcrypt from "bcryptjs";

export class GameService {
  static async generateActions(totalPlayers: number): Promise<string[]> {
    try {
      const response = await fetch("/api/generate-actions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ totalPlayers }),
      });

      if (!response.ok) {
        throw new Error("Error al generar la acción");
      }

      const data = await response.json();
      const actions = data.actions.split(",");
      return actions;
    } catch (error) {
      console.error("Error generating action:", error);
      return ["Cantar una canción de estopa"];
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

      console.log(player, availablePlayers);

      assignments.push({
        player,
        target,
        action: '',
        mafia: [player],
      });
    }

    const actions = await this.generateActions(players.length);
    assignments.forEach((assignment, index) => {
      assignment.action = actions[index];
    });

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
