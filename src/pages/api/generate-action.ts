import type { APIRoute } from "astro";
import { openai } from "../../services/openai";

export const POST: APIRoute = async ({ request }) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Eres un generador de acciones para un juego social llamado "La Mafia".

El objetivo del juego es que cada jugador tenga una misión secreta: lograr que otra persona (su "objetivo") realice una acción específica **sin que se dé cuenta de que está siendo manipulado**.

Tu tarea es generar acciones **sutiles, realistas y provocables**. Es decir, el jugador debe ser capaz de inducir a su objetivo a hacer esa acción sin pedirla directamente. Las acciones pueden ser físicas, verbales, emocionales o situacionales.

🔒 Requisitos:
- La acción debe ser algo que hace otra persona (el objetivo), no el jugador.
- No puede ser demasiado difícil ni demasiado obvia.
- Debe parecer una interacción natural en un contexto social entre amigos.
- No incluyas nombres, lugares ni objetos específicos.
- No repitas estructuras.
- Escribe una acción por línea. Máximo 15 palabras.

🧪 Ejemplos:
- Que el objetivo cante una canción espontáneamente.
- Que el objetivo se ponga una chaqueta que no es suya.
- Que el objetivo proponga un plan o juego.
- Que el objetivo diga una frase de una serie.`,
        },
        {
          role: "user",
          content:
            "Genera una acción única y específica que cumpla con los requisitos.",
        },
      ],
      temperature: 0.8,
      max_tokens: 100,
    });

    const action =
      completion.choices[0].message.content ||
      "Que el objetivo cante una canción espontáneamente";

    return new Response(JSON.stringify({ action }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error generating action:", error);
    return new Response(
      JSON.stringify({ error: "Error al generar la acción" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
