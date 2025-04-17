import { z } from "zod";

export const PlayerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  // email: z.string().email("Email inválido"),
});

export const GameSchema = z.object({
  players: z.array(PlayerSchema).min(2, "Se necesitan al menos 2 jugadores"),
  password: z.string().min(4, "La contraseña debe tener al menos 4 caracteres"),
});

export type Player = z.infer<typeof PlayerSchema>;
export type Game = z.infer<typeof GameSchema>;

export const GameAssignmentSchema = z.object({
  player: PlayerSchema,
  target: PlayerSchema,
  action: z.string(),
  mafia: z.array(PlayerSchema).default([]),
});

export type GameAssignment = z.infer<typeof GameAssignmentSchema>;
