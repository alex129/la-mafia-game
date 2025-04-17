import type { APIRoute } from "astro";
import { supabase } from "../../../../services/supabase";

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { id } = params;
    const { newAction } = await request.json();

    const { data: player, error } = await supabase
      .from("players")
      .select()
      .eq("id", id)
      .single();

    if (!player) {
      return new Response(JSON.stringify({ error: "Player not found" }), {
        status: 404,
      });
    }

    if (player.regenerate_action_times >= 5) {
      return new Response(
        JSON.stringify({
          error: "You have reached the maximum number of attempts",
        }),
        { status: 400 }
      );
    }

    await supabase
      .from("players")
      .update({
        action: newAction,
        regenerate_action_times: player.regenerate_action_times + 1,
      })
      .eq("id", id);

    return new Response("", {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating player action:", error);
    return new Response(
      JSON.stringify({
        error: "Error updating player action",
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
