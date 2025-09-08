import type { APIRoute } from "astro";
import { PrismaGameRepository } from "@infrastructure/repositories/PrismaGameRepository";
import { VerifyGamePassword } from "@application/game/VerifyGamePassword";
import { GameNotFound } from "@domain/game/errors/GameNotFound";
import { DatabaseError } from "@infrastructure/errors/DatabaseError";

const gameRepository = new PrismaGameRepository();
const verifyGamePassword = new VerifyGamePassword(gameRepository);

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { id } = params;
    const { password } = await request.json();

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

    if (!password) {
      return new Response(
        JSON.stringify({
          error: "Password is required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const verified = await verifyGamePassword.execute({
      gameId: id,
      password,
    });

    return new Response(
      JSON.stringify({
        verified,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error verifying password:", error);

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
        error: "Error verifying password",
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
