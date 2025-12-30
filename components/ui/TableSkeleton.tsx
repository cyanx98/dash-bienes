"use client"

import { useTheme } from '@/context/ThemeContext'

interface TableSkeletonProps {
  rows?: number
  columns?: number
}

export function TableSkeleton({ rows = 5, columns = 4 }: TableSkeletonProps) {
  const { isDarkMode: isDark } = useTheme()

  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="animate-pulse">
          {Array.from({ length: columns }).map((_, j) => (
            <td key={j} className="px-8 py-5">
              <div className={`h-4 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}