// app/dashboard/components/Sidebar/Sidebar.tsx

import { usePathname } from 'next/navigation'
import { Home, Users, BarChart3, Settings, UserCircle, LucideIcon } from 'lucide-react'
import { NavItem } from './NavItem'
import { useTheme } from '@/context/ThemeContext'
import { menuItems, MenuItem } from '@/lib/constants/menu.config' // ← IMPORTAR AQUÍ

// interface MenuItem {
//   icon: LucideIcon
//   label: string
//   href: string
//   hasSubmenu: boolean
// }

interface SidebarProps {
  sidebarOpen: boolean
  subMenuOpen: boolean
  setSubMenuOpen: (v: boolean) => void
}

// const menuItems: MenuItem[] = [
//   { icon: Home, label: 'Dashboard', href: '/dashboard', hasSubmenu: false },
//   { icon: UserCircle, label: 'Clientes', href: '/dashboard/client', hasSubmenu: false },
//   { icon: Users, label: 'Usuarios', href: '/dashboard/usuarios', hasSubmenu: true },
//   { icon: BarChart3, label: 'Analíticas', href: '/dashboard/analiticas', hasSubmenu: false },
//   { icon: Settings, label: 'Configuración', href: '/dashboard/configuracion', hasSubmenu: false }
// ]

export const Sidebar = ({ sidebarOpen, subMenuOpen, setSubMenuOpen }: SidebarProps) => {
  const pathname = usePathname()
  const { isDarkMode } = useTheme()

  return (
    <aside className={`fixed top-0 left-0 z-[100] h-full ${isDarkMode ? 'bg-slate-900' : 'bg-white'} border-r ${isDarkMode ? 'border-slate-800/40' : 'border-slate-200'} transition-all duration-500 ease-in-out ${sidebarOpen ? 'w-60 translate-x-0' : 'w-60 -translate-x-full lg:translate-x-0 lg:w-18'}`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className={`h-16 flex items-center justify-between px-5 border-b ${isDarkMode ? 'border-slate-800/20' : 'border-slate-200'} shrink-0`}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className={`${isDarkMode ? 'text-white' : 'text-slate-900'} font-medium text-sm tracking-tight transition-opacity duration-500 ${sidebarOpen ? 'opacity-100' : 'opacity-0 lg:hidden'}`}>
              Admin
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 mt-2">
          <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'} px-3 mb-2 uppercase tracking-widest ${!sidebarOpen && 'lg:hidden'}`}>
            Menu
          </p>
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
  )
}