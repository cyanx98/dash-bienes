import { createBrowserClient } from "@supabase/ssr";
// Crea una conexión a Supabase para usarla en el navegador, manteniendo la sesión del usuario (login).

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
