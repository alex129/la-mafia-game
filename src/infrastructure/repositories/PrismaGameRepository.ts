import type { GameRepository } from "@domain/game/contracts/GameRepository";
import { Game } from "@domain/game/Game";
import { Player } from "@domain/player/Player";
import { DatabaseError } from "@infrastructure/errors/DatabaseError";
import { prisma } from "@infrastructure/db/prisma";

export class PrismaGameRepository implements GameRepository {
  async save(game: Game): Promise<void> {
    try {
      const gameData = {
        id: game.id,
        name: game.name,
        password: game.password,
        created_at: game.created_at,
      };

      const players = game.players.map((player) => ({
        id: player.id,
        name: player.name,
        target: player.target,
        action: player.action,
        game_id: player.game_id,
        regenerate_action_times: player.regenerate_action_times,
      }));

      await prisma.$transaction(async (tx) => {
        await tx.game.upsert({
          where: { id: game.id },
          update: {
            name: gameData.name,
            password: gameData.password,
          },
          create: gameData,
        });

        if (players.length > 0) {
          await tx.player.createMany({
            data: players,
            skipDuplicates: true,
          });
        }
      });
    } catch (error) {
      throw new DatabaseError(
        error instanceof Error ? error.message : "Unknown error saving game"
      );
    }
  }

  async findById(id: string): Promise<Game | null> {
    try {
      const gameData = await prisma.game.findUnique({
        where: { id },
      });

      if (!gameData) {
        return null;
      }

      return Game.fromPrimitives({
        id: gameData.id,
        name: gameData.name,
        created_at: gameData.created_at,
        password: gameData.password,
      });
    } catch (error) {
      throw new DatabaseError(
        error instanceof Error ? error.message : "Error finding game by ID"
      );
    }
  }

  async findByIdWithPlayers(id: string): Promise<Game | null> {
    try {
      const gameData = await prisma.game.findUnique({
        where: { id },
        include: {
          players: true,
        },
      });

      if (!gameData) {
        return null;
      }

      const players = gameData.players.map((playerData) =>
        Player.fromPrimitives({
          id: playerData.id,
          name: playerData.name,
          target: playerData.target,
          action: playerData.action,
          game_id: playerData.game_id,
          regenerate_action_times: playerData.regenerate_action_times || 0,
        })
      );

      const game = Game.fromPrimitives({
        id: gameData.id,
        name: gameData.name,
        created_at: gameData.created_at,
        password: gameData.password,
        players: gameData.players,
      });

      game.setPlayers(players);

      return game;
    } catch (error) {
      throw new DatabaseError(
        error instanceof Error
          ? error.message
          : "Error finding game with players"
      );
    }
  }

  async findAll(): Promise<Game[]> {
    try {
      const gamesData = await prisma.game.findMany({
        orderBy: {
          created_at: "desc",
        },
      });

      return gamesData.map((gameData) =>
        Game.fromPrimitives({
          id: gameData.id,
          name: gameData.name,
          created_at: gameData.created_at,
          password: gameData.password,
        })
      );
    } catch (error) {
      throw new DatabaseError(
        error instanceof Error ? error.message : "Error finding all games"
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.game.delete({
        where: { id },
      });
    } catch (error) {
      throw new DatabaseError(
        error instanceof Error ? error.message : "Error deleting game"
      );
    }
  }

  async cleanup(): Promise<void> {
    try {
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

      await prisma.game.deleteMany({
        where: {
          created_at: {
            lt: twentyFourHoursAgo,
          },
        },
      });
    } catch (error) {
      throw new DatabaseError(
        error instanceof Error ? error.message : "Error cleaning up games"
      );
    }
  }
}
