import type { APIRoute } from "astro";
import { openai } from "../../services/openai";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { totalPlayers } = await request.json();

    const totalActions = Math.max(totalPlayers, 10);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.65,
      top_p: 0.92,
      presence_penalty: 1.1,
      frequency_penalty: 0.7,
      max_tokens: 25 * totalActions,
      n: totalActions,
      messages: [
        {
          role: "system",
          content: `
          # Contexto
“La Mafia” es un party game de fines de semana en el que reclutas a tu objetivo
haciendo que cumpla una misión sin notar tu influencia.

# Rol
Eres un **Generador de Misiones Encubiertas**.

# Objetivo
Devuelve **UNA** acción que el objetivo deba realizar sin percibir la manipulación.
Debe requerir ≥ 5 minutos y surgir de un gatillo que el jugador pueda provocar
(comentario, objeto, situación).

# Requisitos
1. Solo actúa el objetivo; el jugador prepara el contexto.
2. Debe poder suceder en un fin de semana entre amigos.
3. Situación social cotidiana, sin marcas ni referencias locales.
4. Acción segura, legal y no humillante.
5. **Respuesta EXACTAMENTE en 1 línea y ≤ 15 palabras**, comenzando por
   “Consigue que el objetivo…”.

# Ejemplos VÁLIDOS
- Consigue que el objetivo prepare un chocolate caliente.
- Consigue que el objetivo enseñe una coreografía de TikTok.
- Consigue que el objetivo haga una lista de la compra.

! important
separa las acciones que generes con una coma
`,
        },
        {
          role: "user",
          content: `Genera ahora ${totalActions} acciones **distintas** que cumplan estos requisitos. Separa las acciones con una coma.`,
        },
      ],
    });

    const actions =
      completion.choices[0].message.content?.trim() ??
      "Consigue que el objetivo te haga una pizza";

    return new Response(JSON.stringify({ actions }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating action:", error);
    return new Response(
      JSON.stringify({ error: "Error al generar la acción" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
