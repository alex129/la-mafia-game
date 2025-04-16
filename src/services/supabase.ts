import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Game {
  id: string;
  name: string;
  created_at: string;
  players: Player[];
}

export interface Player {
  id: string;
  name: string;
  target: string;
  action: string;
  game_id: string;
}
