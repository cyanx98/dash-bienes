"use client"

import { useState } from 'react'
import { 
  Menu, Home, Users, LogOut, BarChart3, 
  Settings, Bell, Search, ChevronDown, User,
  Moon, Sun, UserCircle
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
// app/dashboard/layout.tsx
import { ThemeProvider, useTheme } from '@/context/ThemeContext' // Ajusta la ruta
// --- COMPONENTES REUTILIZABLES ---




const Tooltip = ({ label }: { label: string }) => (
  <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-4 px-2.5 py-1.5 bg-slate-800 text-white text-xs font-medium rounded shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-[110] whitespace-nowrap border border-slate-700 pointer-events-none">
    {label}
  </div>
)

const NavItem = ({ 
  item, 
  sidebarOpen, 
  subMenuOpen, 
  setSubMenuOpen,
  isActive
}: { 
  item: any, 
  sidebarOpen: boolean, 
  subMenuOpen: boolean, 
  setSubMenuOpen: (v: boolean) => void,
  isActive: boolean
}) => {
  const Icon = item.icon
  
  return (
    <div className="relative group">
      <Link
        href={item.href}
        onClick={() => item.hasSubmenu && sidebarOpen && setSubMenuOpen(!subMenuOpen)}
        className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${
          isActive ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'
        }`}
      >
        <Icon className={`w-4.5 h-4.5 shrink-0 ${sidebarOpen ? 'mr-3' : 'lg:mx-auto'}`} />
        <span className={`text-xs transition-opacity duration-500 flex-1 text-left ${sidebarOpen ? 'opacity-100' : 'opacity-0 lg:hidden'}`}>
          {item.label}
        </span>
        {item.hasSubmenu && sidebarOpen && (
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${subMenuOpen ? 'rotate-180' : ''}`} />
        )}
      </Link>

      {!sidebarOpen && <Tooltip label={item.label} />}

      {item.hasSubmenu && (
        <div className={`overflow-hidden transition-all duration-300 bg-slate-900/30 rounded-lg mt-1 ${subMenuOpen && sidebarOpen ? 'max-h-40 py-1' : 'max-h-0'}`}>
          <div className="pl-10 space-y-1">
            <Link href="/dashboard/usuarios" className="block w-full text-left py-1.5 text-xs text-slate-500 hover:text-blue-400 transition-colors">
              Lista Total
            </Link>
            <button className="w-full text-left py-1.5 text-xs text-slate-500 hover:text-blue-400 transition-colors">
              Roles
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [loading, setLoading] = useState(false)
  
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()
  
  const user = { email: 'admin@example.com', name: 'Admin User' }

  // Función de logout
  const handleLogout = async () => {
    setLoading(true)
    setUserMenuOpen(false)
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', hasSubmenu: false },
    { icon: Users, label: 'Usuarios', href: '/dashboard/usuarios', hasSubmenu: true },
    { icon: UserCircle, label: 'Clientes', href: '/dashboard/client', hasSubmenu: false },
    { icon: BarChart3, label: 'Analíticas', href: '/dashboard/analiticas', hasSubmenu: false },
    { icon: Settings, label: 'Configuración', href: '/dashboard/configuracion', hasSubmenu: false }
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950 text-slate-400' : 'bg-slate-50 text-slate-600'} font-sans overflow-hidden`}>
      
      {/* OVERLAY MÓVIL */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[90] lg:hidden transition-opacity duration-500 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* SIDEBAR */}
      <aside className={`fixed top-0 left-0 z-[100] h-full ${isDarkMode ? 'bg-slate-900' : 'bg-white'} border-r ${isDarkMode ? 'border-slate-800/40' : 'border-slate-200'} transition-all duration-500 ease-in-out ${sidebarOpen ? 'w-60 translate-x-0' : 'w-60 -translate-x-full lg:translate-x-0 lg:w-18'}`}>
        <div className="flex flex-col h-full">
          <div className={`h-16 flex items-center justify-between px-5 border-b ${isDarkMode ? 'border-slate-800/20' : 'border-slate-200'} shrink-0`}>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className={`${isDarkMode ? 'text-white' : 'text-slate-900'} font-medium text-sm tracking-tight transition-opacity duration-500 ${sidebarOpen ? 'opacity-100' : 'opacity-0 lg:hidden'}`}>TailAdmin</span>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1 mt-2">
            <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'} px-3 mb-2 uppercase tracking-widest ${!sidebarOpen && 'lg:hidden'}`}>Menu</p>
            {menuItems.map((item, index) => (
              <NavItem 
                key={index} 
                item={item} 
                sidebarOpen={sidebarOpen} 
                subMenuOpen={subMenuOpen} 
                setSubMenuOpen={setSubMenuOpen}
                isActive={pathname === item.href}
              />
            ))}
          </nav>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className={`relative flex flex-col h-screen transition-all duration-500 ${sidebarOpen ? 'lg:ml-60' : 'lg:ml-18'}`}>
        
        {/* HEADER */}
        <header className={`relative z-[80] h-16 ${isDarkMode ? 'bg-slate-900/40' : 'bg-white/80'} backdrop-blur-md border-b ${isDarkMode ? 'border-slate-800/30' : 'border-slate-200'} flex items-center px-6 justify-between shrink-0`}>
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`p-2 -ml-2 ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'} rounded-lg transition-all cursor-pointer`}>
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Buscador */}
            <div className={`hidden md:flex items-center ${isDarkMode ? 'bg-slate-800/30 border-slate-700/30 focus-within:border-blue-500/50' : 'bg-slate-100 border-slate-200 focus-within:border-blue-500'} rounded-lg px-3 py-1.5 border transition-all group`}>
              <Search className={`w-3.5 h-3.5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'} mr-2 group-focus-within:text-blue-500`} />
              <input type="text" placeholder="Buscar..." className={`bg-transparent ${isDarkMode ? 'text-white placeholder-slate-600' : 'text-slate-900 placeholder-slate-400'} text-xs outline-none w-48`} />
            </div>
          </div>
          
          <div className="flex items-center space-x-5">
            {/* BOTÓN DE MODO OSCURO/CLARO */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-all ${isDarkMode ? 'text-slate-400 hover:text-yellow-400 hover:bg-slate-800/50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'} cursor-pointer`}
            >
              {isDarkMode ? (
                <Sun className="w-4.5 h-4.5" />
              ) : (
                <Moon className="w-4.5 h-4.5" />
              )}
            </button>

            <div className="relative cursor-pointer group">
              <Bell className={`w-4 h-4 ${isDarkMode ? 'text-slate-500 group-hover:text-white' : 'text-slate-500 group-hover:text-slate-900'} transition-colors`} />
              <span className={`absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full border-2 ${isDarkMode ? 'border-slate-950' : 'border-white'}`}></span>
            </div>

            {/* Perfil de Usuario con Menú */}
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white font-bold cursor-pointer transition-all hover:scale-105 active:scale-95">
                {user.email[0].toUpperCase()}
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setUserMenuOpen(false)}></div>
                  <div className={`absolute right-0 mt-3 w-44 ${isDarkMode ? 'bg-slate-900 border-slate-800/60' : 'bg-white border-slate-200'} border rounded-xl shadow-2xl py-2 z-[90] animate-in fade-in zoom-in duration-200 origin-top-right translate-x-2 sm:translate-x-0`}>
                    <div className={`px-4 py-2 border-b ${isDarkMode ? 'border-slate-800/40' : 'border-slate-200'} mb-1`}>
                      <p className={`text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'} font-medium truncate`}>{user.name}</p>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'} truncate`}>Administrador</p>
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
          </div>
        </header>

        {/* ÁREA DE CONTENIDO DINÁMICO - Aquí se renderizan las páginas hijas */}
        <main className={`flex-1 overflow-y-auto ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
          {children}
        </main>
      </div>
    </div>
  )
}
