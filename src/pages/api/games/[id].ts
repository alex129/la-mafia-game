import type { APIRoute } from "astro";
import { supabase } from "../../../services/supabase";

export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = params;

    // Get the game
    const { data: game, error: gameError } = await supabase
      .from("games")
      .select("*")
      .eq("id", id)
      .single();

    if (gameError) throw gameError;

    // Get the players for this game
    const { data: players, error: playersError } = await supabase
      .from("players")
      .select("*")
      .eq("game_id", id);

    if (playersError) throw playersError;

    return new Response(
      JSON.stringify({
        game: { ...game, players },
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
        error: "Error fetching game",
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
