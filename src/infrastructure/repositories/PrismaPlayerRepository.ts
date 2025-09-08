import type { PlayerRepository } from "@domain/player/contracts/PlayerRepository";
import { Player } from "@domain/player/Player";
import { DatabaseError } from "@infrastructure/errors/DatabaseError";
import { prisma } from "@infrastructure/db/prisma";

export class PrismaPlayerRepository implements PlayerRepository {
  async save(player: Player): Promise<void> {
    try {
      const playerData = {
        id: player.id,
        name: player.name,
        target: player.target,
        action: player.action,
        game_id: player.game_id,
        regenerate_action_times: player.regenerate_action_times,
      };

      await prisma.player.upsert({
        where: { id: player.id },
        update: {
          name: playerData.name,
          target: playerData.target,
          action: playerData.action,
          regenerate_action_times: playerData.regenerate_action_times,
        },
        create: playerData,
      });
    } catch (error) {
      throw new DatabaseError(
        error instanceof Error ? error.message : "Unknown error saving player"
      );
    }
  }

  async findById(id: string): Promise<Player | null> {
    try {
      const playerData = await prisma.player.findUnique({
        where: { id },
      });

      if (!playerData) {
        return null;
      }

      return Player.fromPrimitives({
        id: playerData.id,
        name: playerData.name,
        target: playerData.target,
        action: playerData.action,
        game_id: playerData.game_id,
        regenerate_action_times: playerData.regenerate_action_times || 0,
      });
    } catch (error) {
      throw new DatabaseError(
        error instanceof Error ? error.message : "Error finding player by ID"
      );
    }
  }

  async findByGameId(gameId: string): Promise<Player[]> {
    try {
      const playersData = await prisma.player.findMany({
        where: { game_id: gameId },
      });

      return playersData.map((playerData) =>
        Player.fromPrimitives({
          id: playerData.id,
          name: playerData.name,
          target: playerData.target,
          action: playerData.action,
          game_id: playerData.game_id,
          regenerate_action_times: playerData.regenerate_action_times || 0,
        })
      );
    } catch (error) {
      throw new DatabaseError(
        error instanceof Error
          ? error.message
          : "Error finding players by game ID"
      );
    }
  }

  async updateAction(id: string, action: string): Promise<void> {
    try {
      await prisma.player.update({
        where: { id },
        data: { action },
      });
    } catch (error) {
      throw new DatabaseError(
        error instanceof Error ? error.message : "Error updating player action"
      );
    }
  }

  async incrementRegenerateActionTimes(id: string): Promise<void> {
    try {
      await prisma.player.update({
        where: { id },
        data: {
          regenerate_action_times: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      throw new DatabaseError(
        error instanceof Error
          ? error.message
          : "Error incrementing regenerate action times"
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.player.delete({
        where: { id },
      });
    } catch (error) {
      throw new DatabaseError(
        error instanceof Error ? error.message : "Error deleting player"
      );
    }
  }
}
