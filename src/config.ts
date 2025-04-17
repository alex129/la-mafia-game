export const config = {
  MAX_REGENERATE_ACTION_TIMES: 5,
  OPENAI_API_KEY: import.meta.env.OPENAI_API_KEY,
  SUPABASE_URL: import.meta.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.SUPABASE_ANON_KEY,
} as const;
