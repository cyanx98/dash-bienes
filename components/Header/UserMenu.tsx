// app/dashboard/components/Header/UserMenu.tsx

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useTheme } from '@/context/ThemeContext'

interface UserMenuProps {
  user: {
    email: string
    name: string
  }
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const router = useRouter()
  const supabase = createClient()
  const { isDarkMode } = useTheme()

  const handleLogout = async () => {
    setLoading(true)
    setUserMenuOpen(false)
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setUserMenuOpen(!userMenuOpen)} 
        className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white font-bold cursor-pointer transition-all hover:scale-105 active:scale-95"
      >
        {user.email[0].toUpperCase()}
      </button>

      {userMenuOpen && (
        <>
          <div className="fixed inset-0 z-[-1]" onClick={() => setUserMenuOpen(false)}></div>
          <div className={`absolute right-0 mt-3 w-44 ${isDarkMode ? 'bg-slate-900 border-slate-800/60' : 'bg-white border-slate-200'} border rounded-xl shadow-2xl py-2 z-[90] animate-in fade-in zoom-in duration-200 origin-top-right translate-x-2 sm:translate-x-0`}>
            <div className={`px-4 py-2 border-b ${isDarkMode ? 'border-slate-800/40' : 'border-slate-200'} mb-1`}>
              <p className={`text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'} font-medium truncate`}>
                {user.name}
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'} truncate`}>
                Administrador
              </p>
            </div>
            <button className={`w-full flex items-center px-4 py-2 text-xs ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/40' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'} transition-colors`}>
              <User className="w-3.5 h-3.5 mr-2" /> Perfil
            </button>
            <button 
              onClick={handleLogout}
              disabled={loading}
              className={`w-full flex items-center px-4 py-2 text-xs text-red-400 ${isDarkMode ? 'hover:bg-red-500/10' : 'hover:bg-red-50'} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <LogOut className="w-3.5 h-3.5 mr-2" /> 
              {loading ? 'Saliendo...' : 'Salir'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}