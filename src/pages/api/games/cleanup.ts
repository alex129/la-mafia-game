import type { APIRoute } from "astro";
import { supabase } from "../../../services/supabase";

export const POST: APIRoute = async () => {
  try {
    // Delete all players first (due to foreign key constraint)
    const { error: playersError } = await supabase
      .from("players")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all players

    if (playersError) throw playersError;

    // Then delete all games
    const { error: gamesError } = await supabase
      .from("games")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all games

    if (gamesError) throw gamesError;

    return new Response(
      JSON.stringify({
        success: true,
        message: "All games and players have been deleted",
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
    return new Response(
      JSON.stringify({
        error: "Error cleaning up games",
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
