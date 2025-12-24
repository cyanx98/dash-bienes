import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
// import LogoutButton from './LogoutButton'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <nav className="bg-gray-800/50 backdrop-blur-xl border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
            {/* <LogoutButton /> */}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {/* {user.email?.[0].toUpperCase()} */}
                user
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">¡Bienvenido!</h2>
              {/* <p className="text-gray-400">{user.email}</p> */}
              user2025
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50">
              <div className="text-blue-400 mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Autenticado</h3>
              <p className="text-gray-400 text-sm">Tu sesión está activa y protegida</p>
            </div>

            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50">
              <div className="text-purple-400 mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Seguro</h3>
              <p className="text-gray-400 text-sm">Protegido con Supabase Auth</p>
            </div>

            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50">
              <div className="text-green-400 mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Rápido</h3>
              <p className="text-gray-400 text-sm">Next.js 15 con App Router</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-2">ID de Usuario</h3>
            {/* <p className="text-gray-300 font-mono text-sm break-all">{user.id}</p> */}
            user2026
          </div>
        </div>
      </main>
    </div>
  )
}