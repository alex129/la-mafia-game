import type { APIRoute } from "astro";
import { PrismaGameRepository } from "@infrastructure/repositories/PrismaGameRepository";
import { FindGameByIdWithPlayers } from "@application/game/FindGameByIdWithPlayers";
import { GameNotFound } from "@domain/game/errors/GameNotFound";
import { DatabaseError } from "@infrastructure/errors/DatabaseError";

const gameRepository = new PrismaGameRepository();
const findGameByIdWithPlayers = new FindGameByIdWithPlayers(gameRepository);

export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = params;

    if (!id) {
      return new Response(
        JSON.stringify({
          error: "Game ID is required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const game = await findGameByIdWithPlayers.execute(id);

    return new Response(
      JSON.stringify({
        game: game.toPrimitives(),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching game:", error);

    if (error instanceof GameNotFound) {
      return new Response(
        JSON.stringify({
          error: error.message,
        }),
        {
          status: error.httpCode,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const statusCode = error instanceof DatabaseError ? error.httpCode : 500;

    return new Response(
      JSON.stringify({
        error: "Error fetching game",
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
