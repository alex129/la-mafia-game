import type { APIRoute } from "astro";
import { PrismaPlayerRepository } from "@infrastructure/repositories/PrismaPlayerRepository";
import { UpdatePlayerAction } from "@application/player/UpdatePlayerAction";
import { PlayerNotFound } from "@domain/player/errors/PlayerNotFound";
import { InvalidPlayerError } from "@domain/player/errors/InvalidPlayerError";
import { DatabaseError } from "@infrastructure/errors/DatabaseError";

const playerRepository = new PrismaPlayerRepository();
const updatePlayerAction = new UpdatePlayerAction(playerRepository);

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { id } = params;
    const { newAction } = await request.json();

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

    if (!newAction) {
      return new Response(
        JSON.stringify({
          error: "New action is required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    await updatePlayerAction.execute({
      playerId: id,
      newAction,
      maxRegenerateAttempts: 5,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Player action updated successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error updating player action:", error);

    if (
      error instanceof PlayerNotFound ||
      error instanceof InvalidPlayerError
    ) {
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
        error: "Error updating player action",
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
