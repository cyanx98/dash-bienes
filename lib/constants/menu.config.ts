// src/lib/constants/menu.ts (sin .config)
import { Home, Users, BarChart3, Settings, UserCircle, LucideIcon } from 'lucide-react'

export interface MenuItem {
  icon: LucideIcon
  label: string
  href: string
  hasSubmenu: boolean
}

export const menuItems: MenuItem[] = [
  { icon: Home, label: 'Dashboard', href: '/dashboard', hasSubmenu: false },
  { icon: UserCircle, label: 'Clientes', href: '/dashboard/client', hasSubmenu: false },
  { icon: Users, label: 'Usuarios', href: '/dashboard/usuarios', hasSubmenu: true },
  { icon: BarChart3, label: 'Analíticas', href: '/dashboard/analiticas', hasSubmenu: false },
  { icon: Settings, label: 'Configuración', href: '/dashboard/configuracion', hasSubmenu: false }
]