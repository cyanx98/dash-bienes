// Importa la función para crear un cliente Supabase DEL LADO SERVIDOR
// y el tipo CookieOptions (solo para TypeScript)
import { createServerClient, type CookieOptions } from "@supabase/ssr";

// Importa la función de Next.js para acceder a las cookies del request HTTP
// Esto SOLO funciona en el servidor (Node.js)
import { cookies } from "next/headers";

// Función que crea y devuelve un cliente Supabase para el servidor
export async function createServerSupabaseClient() {
  // Obtiene las cookies que el navegador envió en la request
  // Aquí está la sesión del usuario (si está logueado)
  const cookieStore = await cookies();

  // Crea el cliente Supabase para SSR
  return createServerClient(
    // URL de tu proyecto Supabase
    process.env.NEXT_PUBLIC_SUPABASE_URL!,

    // Clave pública (anon key) para conectarse a Supabase
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

    // Configuración para que Supabase sepa
    // cómo leer y escribir cookies en Next.js
    {
      cookies: {
        // 🔹 LEER COOKIES
        // Supabase llama a esta función cuando necesita
        // leer la cookie de sesión del usuario
        get(name: string) {
          return cookieStore.get(name)?.value;
        },

        // 🔹 ESCRIBIR COOKIES
        // Supabase la usa cuando:
        // - el usuario hace login
        // - se renueva el token
        set(name: string, value: string, options: CookieOptions) {
          try {
            // Guarda la cookie en la respuesta HTTP
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // En Server Components no siempre se pueden modificar cookies
            // El try/catch evita que la app falle
          }
        },

        // 🔹 ELIMINAR COOKIES
        // Supabase la usa cuando el usuario hace logout
        remove(name: string, options: CookieOptions) {
          try {
            // Borra la cookie colocando el valor vacío
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // Evita errores en Server Components
          }
        },
      },
    }
  );
}
