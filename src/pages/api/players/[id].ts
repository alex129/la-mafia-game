import type { APIRoute } from "astro";
import { supabase } from "../../../services/supabase";

export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = params;

    // Get the player
    const { data: player, error } = await supabase
      .from("players")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({
        player,
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
        error: "Error fetching player",
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
