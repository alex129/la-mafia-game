import type { APIRoute } from "astro";
import { supabase } from "../../../../services/supabase";
import bcrypt from "bcryptjs";

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { id } = params;
    const { password } = await request.json();

    // Get the game
    const { data: game, error: gameError } = await supabase
      .from("games")
      .select("password")
      .eq("id", id)
      .single();

    if (gameError) throw gameError;

    const verified = await bcrypt.compare(password, game.password);

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
    return new Response(
      JSON.stringify({
        error: "Error verifying password",
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
