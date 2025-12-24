// Importa la función para crear un cliente Supabase DEL LADO SERVIDOR
// y el tipo CookieOptions (solo para TypeScript)
import { createServerClient, type CookieOptions } from "@supabase/ssr";

// Importa utilidades de Next.js para trabajar con middleware
// NextRequest  -> request entrante (URL, cookies, headers)
// NextResponse -> respuesta que Next.js devolverá
import { NextResponse, type NextRequest } from "next/server";

// Middleware: se ejecuta ANTES de cargar cualquier página
// Sirve para:
// - Leer sesión
// - Proteger rutas
// - Renovar cookies
export async function middleware(request: NextRequest) {

  // Se crea una respuesta "por defecto"
  // NextResponse.next() significa: "deja pasar la request"
  let response = NextResponse.next({
    request: {
      // Se copian los headers originales
      headers: request.headers,
    },
  });

  // Se crea el cliente Supabase en el MIDDLEWARE (servidor)
  const supabase = createServerClient(

    // URL del proyecto Supabase
    process.env.NEXT_PUBLIC_SUPABASE_URL!,

    // Clave pública (anon key)
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

    // Configuración de cookies para middleware
    {
      cookies: {

        // 🔹 LEER COOKIES
        // Supabase llama a esta función para leer la sesión
        get(name: string) {
          return request.cookies.get(name)?.value;
        },

        // 🔹 ESCRIBIR COOKIES
        // Se usa cuando Supabase necesita actualizar la sesión
        // (refresh token, login, etc.)
        set(name: string, value: string, options: CookieOptions) {

          // Actualiza la cookie en el request
          request.cookies.set({
            name,
            value,
            ...options,
          });

          // Se crea una nueva respuesta (IMPORTANTE)
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });

          // Se escribe la cookie en la respuesta
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },

        // 🔹 ELIMINAR COOKIES
        // Se usa cuando el usuario hace logout
        remove(name: string, options: CookieOptions) {

          // Se borra la cookie en el request
          request.cookies.set({
            name,
            value: "",
            ...options,
          });

          // Se crea una nueva respuesta
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });

          // Se borra la cookie en la respuesta
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  // Fuerza a Supabase a:
  // - Leer la sesión del usuario
  // - Validar el token
  // - Renovar cookies si es necesario
  await supabase.auth.getUser();

  // Devuelve la respuesta (con cookies actualizadas si hubo cambios)
  return response;
}

// Configuración del middleware
export const config = {
  matcher: [
    // Aplica el middleware a TODAS las rutas
    // EXCEPTO:
    // - Archivos estáticos
    // - Imágenes
    // - favicon
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
