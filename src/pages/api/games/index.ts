import type { APIRoute } from "astro";
import { supabase } from "../../../services/supabase";

export const GET: APIRoute = async () => {
  try {
    const { data: games, error } = await supabase
      .from("games")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return new Response(
      JSON.stringify({
        games,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Error fetching games",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const { players } = await request.json();

    const { data: game, error: gameError } = await supabase
      .from("games")
      .insert({})
      .select()
      .single();

    if (gameError) throw gameError;

    // Create players for the game
    const playersWithGameId = players.map((player: any) => ({
      ...player,
      game_id: game.id,
    }));

    const { data: createdPlayers, error: playersError } = await supabase
      .from("players")
      .insert(playersWithGameId)
      .select();

    if (playersError) throw playersError;

    return new Response(
      JSON.stringify({
        game: { ...game, players: createdPlayers },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: "Error creating game",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
