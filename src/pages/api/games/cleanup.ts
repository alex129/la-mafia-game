import type { APIRoute } from "astro";
import { PrismaGameRepository } from "@infrastructure/repositories/PrismaGameRepository";
import { CleanupOldGames } from "@application/game/CleanupOldGames";
import { DatabaseError } from "@infrastructure/errors/DatabaseError";

const gameRepository = new PrismaGameRepository();
const cleanupOldGames = new CleanupOldGames(gameRepository);

export const POST: APIRoute = async () => {
  try {
    await cleanupOldGames.execute();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Old games cleaned up successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error cleaning up games:", error);
    const statusCode = error instanceof DatabaseError ? error.httpCode : 500;

    return new Response(
      JSON.stringify({
        error: "Error cleaning up games",
      }),
      {
        status: statusCode,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
