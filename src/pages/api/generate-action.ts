import type { APIRoute } from "astro";
import { openai } from "../../services/openai";

export const POST: APIRoute = async () => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.9,
      max_tokens: 150,
      messages: [
        {
          role: "system",
          content: `
          # Rol
          Eres un *Generador de Acciones Secretas* para el juego social **“La Mafia”**.

# Objetivo  
Devuelve **una única acción** que el **objetivo** (otra persona) deba realizar **sin notar** la manipulación del jugador.  
La acción tiene que ser **reacción directa a un estímulo simple** que el jugador puede crear para que el objetivo realice la acción.
(ej.: manchar → limpiarse, apagar la luz → encenderla, dar un golpecito → mirar atrás).

# Requisitos  
1. Solo el objetivo realiza la acción; el jugador la provoca de forma indirecta por lo que el objetivo no se da cuenta pero el jugador debe pensar que accion puede provocar.  
2. Debe poder ocurrir en un fin de semana entre amigos.  
3. Encaja en una situación social cotidiana.  
4. No incluyas nombres, marcas ni objetos demasiado concretos.  
5. Salida en **una sola línea**, máx. 15 palabras, empezando por “Consigue que el objetivo…”.  

# Ejemplos *VALIDOS*  
- Consigue que el objetivo se lave la cara.  
- Consigue que el objetivo se coma una galleta.  
- Consigue que el objetivo se lave los dientes.  
- Consigue que el objetivo cante una cancion de reggaeton.  
- Consigue que el objetivo se ate los cordones.
- Consigue que el objetivo se ponga una chaqueta
- Consigue que el objetivo diga “salud”

# Ejemplos *NO VALIDOS*
- Consigue que el objetivo haga una pausa y respire profundamente.
- Consigue que el objetivo se quite una mota de polvo del hombro. (es demasiado directa ya que el jugador solo tendria que ponerle una pelusa en el hombro)
- Consigue que el objetivo se peine. (Demasiado directa, el jugador solo tendria que despeinarle por ejemplo)
- Consigue que el objetivo se ajuste la corbata. (Demasiado especifico, que pasa si el jugador no tiene corbata?)
- Consigue que el objetivo se ponga de pie. (Demasiado directa, el jugador solo tendria que decirle que se levante)

!IMPORTANTE!
- Fijate en los ejemplos de acciones válidas y no válidas para que la acción que generes sea correcta.
- Genera ahora UNA acción que cumpla estos requisitos.`,
        },
        {
          role: "user",
          content: "Genera la acción.",
        },
      ],
    });

    const action =
      completion.choices[0].message.content ??
      "Consigue que el objetivo se coma una galleta.";

    return new Response(JSON.stringify({ action }), {
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
