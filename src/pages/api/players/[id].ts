import type { APIRoute } from "astro";
import { PrismaPlayerRepository } from "@infrastructure/repositories/PrismaPlayerRepository";
import { FindPlayerById } from "@application/player/FindPlayerById";
import { PlayerNotFound } from "@domain/player/errors/PlayerNotFound";
import { DatabaseError } from "@infrastructure/errors/DatabaseError";

const playerRepository = new PrismaPlayerRepository();
const findPlayerById = new FindPlayerById(playerRepository);

export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = params;

    if (!id) {
      return new Response(
        JSON.stringify({
          error: "Player ID is required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const player = await findPlayerById.execute(id);

    return new Response(
      JSON.stringify({
        player: player.toPrimitives(),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching player:", error);

    if (error instanceof PlayerNotFound) {
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
        error: "Error fetching player",
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
