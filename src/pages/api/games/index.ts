import type { APIRoute } from "astro";
import { PrismaGameRepository } from "@infrastructure/repositories/PrismaGameRepository";
import { PrismaPlayerRepository } from "@infrastructure/repositories/PrismaPlayerRepository";
import { FindAllGames } from "@application/game/FindAllGames";
import { CreateGame } from "@application/game/CreateGame";
import { DatabaseError } from "@infrastructure/errors/DatabaseError";

const gameRepository = new PrismaGameRepository();
const playerRepository = new PrismaPlayerRepository();
const findAllGames = new FindAllGames(gameRepository);
const createGame = new CreateGame(gameRepository, playerRepository);

export const GET: APIRoute = async () => {
  try {
    const games = await findAllGames.execute();
    const gamesData = games.map((game) => game.toPrimitives());

    return new Response(
      JSON.stringify({
        games: gamesData,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching games:", error);
    const statusCode = error instanceof DatabaseError ? error.httpCode : 500;

    return new Response(
      JSON.stringify({
        error: "Error fetching games",
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

export const POST: APIRoute = async ({ request }) => {
  try {
    const { players, password, name } = await request.json();

    const game = await createGame.execute({
      password,
      name,
      players,
    });

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
    console.error("Error creating game:", error);
    const statusCode = error instanceof DatabaseError ? error.httpCode : 500;

    return new Response(
      JSON.stringify({
        error: "Error creating game",
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
