export function createGameAssignmentFile(
  playerName: string,
  targetName: string,
  action: string
): string {
  const content = `
🎮 La Mafia Game

¡Hola ${playerName}!

Tu misión en La Mafia Game es:

Objetivo: ${targetName}
Acción: ${action}

Recuerda: Una vez que logres que tu objetivo realice la acción, se unirá a tu mafia y tendrá el mismo objetivo que tú.

¡Buena suerte!
`;

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  return url;
}

export function downloadFile(url: string, filename: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
