import { createClient } from '@supabase/supabase-js'


  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
  const supabaseAnonkey = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

  export const supabase = createClient(supabaseUrl, supabaseAnonkey)

  export function createSupabaseClient(getToken: () => Promise<string>) {
    return createClient(supabaseUrl, supabaseAnonkey, {
      async accessToken() {
        return await getToken()
      },
    });
}