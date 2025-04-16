export async function sendGameAssignment(
  playerEmail: string,
  playerName: string,
  targetName: string,
  action: string
) {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerEmail,
        playerName,
        targetName,
        action,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al enviar el email");
    }

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}
