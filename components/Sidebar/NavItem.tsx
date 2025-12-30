// app/dashboard/components/Sidebar/NavItem.tsx

import Link from 'next/link'
import { ChevronDown, LucideIcon } from 'lucide-react'
import { Tooltip } from './Tooltip'

interface MenuItem {
  icon: LucideIcon
  label: string
  href: string
  hasSubmenu: boolean
}

interface NavItemProps {
  item: MenuItem
  sidebarOpen: boolean
  subMenuOpen: boolean
  setSubMenuOpen: (v: boolean) => void
  isActive: boolean
}

export const NavItem = ({ 
  item, 
  sidebarOpen, 
  subMenuOpen, 
  setSubMenuOpen,
  isActive
}: NavItemProps) => {
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