import { createClient } from "@supabase/supabase-js";
import { config } from "../config";

const supabaseUrl = config.SUPABASE_URL;
const supabaseKey = config.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Game {
  id: string;
  name: string;
  created_at: string;
  password: string;
  players: Player[];
}

export interface Player {
  id: string;
  name: string;
  target: string;
  action: string;
  game_id: string;
  regenerate_action_times?: number;
}
