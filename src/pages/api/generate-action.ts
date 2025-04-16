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
- Que el objetivo diga una frase de una serie.

### 🕵️ Acciones para el Juego "La Mafia" (provocadas por otro jugador)

1. Que tu objetivo cante una canción (cualquiera).
2. Que tu objetivo te abrace sin que se lo pidas directamente.
3. Que tu objetivo diga "esto me recuerda a..."
4. Que tu objetivo te ofrezca comida o bebida.
5. Que tu objetivo se siente en el suelo sin que nadie más lo haga.
6. Que tu objetivo te cuente un recuerdo de la infancia.
7. Que tu objetivo imite a alguien (persona famosa o del grupo).
8. Que tu objetivo diga "no puedo más" o algo similar.
9. Que tu objetivo te diga una frase en otro idioma.
10. Que tu objetivo se ponga una prenda que no es suya.
11. Que tu objetivo proponga un plan o juego.
12. Que tu objetivo te diga una mentira (y tú la detectes).
13. Que tu objetivo diga una frase de película o serie.
14. Que tu objetivo use una voz rara o distinta.
15. Que tu objetivo se queje de algo (con comida, clima, personas, etc.).
16. Que tu objetivo se ofrezca a ayudarte con algo.
17. Que tu objetivo entre en una habitación donde no había nadie.
18. Que tu objetivo te haga una pregunta profunda o incómoda.
19. Que tu objetivo diga "necesito un descanso".
20. Que tu objetivo tararee una melodía sin música puesta.`,
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
