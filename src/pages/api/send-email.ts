import type { APIRoute } from "astro";
import { resend } from "../../services/resend";

export const GET: APIRoute = async ({ request }) => {
  try {
    const { playerEmail, playerName, targetName, action } =
      await request.json();

    // await resend.emails.send({
    //   from: "La Mafia Game <noreply@lamafiagame.com>",
    //   to: playerEmail,
    //   subject: "🎮 Tu misión en La Mafia Game",
    //   html: `
    //     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    //       <h1 style="color: #6B46C1; text-align: center;">🎮 La Mafia Game</h1>
    //       <div style="background-color: #F3E8FF; padding: 20px; border-radius: 10px; margin: 20px 0;">
    //         <h2 style="color: #553C9A;">¡Hola ${playerName}!</h2>
    //         <p>Tu misión en La Mafia Game es:</p>
    //         <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 10px 0;">
    //           <p><strong>Objetivo:</strong> ${targetName}</p>
    //           <p><strong>Acción:</strong> ${action}</p>
    //         </div>
    //         <p>Recuerda: Una vez que logres que tu objetivo realice la acción, se unirá a tu mafia y tendrá el mismo objetivo que tú.</p>
    //         <p>¡Buena suerte!</p>
    //       </div>
    //     </div>
    //   `,
    // });

    await resend.emails.send({
      from: "La Mafia Game <noreply@lamafiagame.com>",
      to: ["plikforo@gmail.com"],
      subject: "🎮 Tu misión en La Mafia Game",
      html: "<strong>It works!</strong>",
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Error al enviar el email" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
