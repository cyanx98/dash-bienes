"use client"

import { SearchBar } from '@/components/ui/SearchBar'
import { Pagination } from '@/components/ui/Pagination'
import { TableSkeleton } from '@/components/ui/TableSkeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { FilterPanel } from '@/components/ui/FilterPanel'
import { ClientTableRow } from '@/components/client/ClientTableRow'
import { ClientTableHeader } from '@/components/client/ClientTableHeader'
import { ClientFilters } from '@/components/client/ClientFilters'
import { useTheme } from '@/context/ThemeContext'
import { createClient } from '@/lib/supabase/client'
import { Plus, Filter, FileText } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { PaginationInfo } from '@/components/ui/PaginationInfo'
import ModalRegistro from '@/components/client/ModalRegistro'
import { generateClientesPDF } from '@/lib/pdf/exportClientesPDF'
import { fechaFinUTC, fechaInicioUTC } from '@/lib/utils/dateUtils'

export default function ClientesPage() {
  const { isDarkMode: isDark } = useTheme()
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const [clientes, setClientes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [sortField, setSortField] = useState<'nombre' | 'email' | 'created_at'>('created_at')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [showFilters, setShowFilters] = useState(false)
  
  // 🆕 ESTADOS PARA FILTROS DE FECHA
  const [fechaDesde, setFechaDesde] = useState("")
  const [fechaHasta, setFechaHasta] = useState("")

  const supabase = createClient()

  const fetchClientes = useCallback(async () => {
    setIsLoading(true)
    // 🔍 DEBUG - Agregar console.log para ver las fechas
  console.log('📅 Filtros aplicados:', { fechaDesde, fechaHasta })

    const from = (currentPage - 1) * itemsPerPage
    const to = from + itemsPerPage - 1

    let query = supabase
      .from('clientes')
      .select('*', { count: 'exact' })
      .order(sortField, { ascending: sortOrder === 'asc' })
      .range(from, to)

    // Búsqueda por nombre o email
    if (search) {
      query = query.or(`nombre.ilike.%${search}%,email.ilike.%${search}%`)
    }

    if (fechaDesde) {
      query = query.gte('fecha_registro', fechaDesde)
    }

    if (fechaHasta) {
      query = query.lte('fecha_registro', fechaHasta)
    }




    const { data, count, error } = await query

    if (error) {
      console.error(error)
    } else {
      setClientes(data || [])
      setTotalCount(count || 0)
    }

    setIsLoading(false)
  }, [currentPage, itemsPerPage, search, sortField, sortOrder, fechaDesde, fechaHasta]) // 🆕 Agregamos las dependencias

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchClientes()
    }, 300)
    return () => clearTimeout(timer)
  }, [fetchClientes])

  const totalPages = Math.ceil(totalCount / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalCount)

  const handleSort = (field: 'nombre' | 'email') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const handleAddCliente = (nuevoCliente: any) => {
    setClientes((prev) => [nuevoCliente, ...prev])
    setTotalCount(prev => prev + 1)
    setIsModalOpen(false)
  }

  const openPDFInNewTab = () => {
    const doc = generateClientesPDF(clientes)
    if (!doc) return
    const url = doc.output('bloburl')
    window.open(url, '_blank')
  }

  // 🆕 FUNCIÓN PARA LIMPIAR FILTROS
  const clearFilters = () => {
    setFechaDesde("")
    setFechaHasta("")
    setCurrentPage(1)
  }

  // 🆕 VERIFICAR SI HAY FILTROS ACTIVOS
  const hasActiveFilters = fechaDesde || fechaHasta

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Clientes
          </h1>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Gestiona y visualiza tu base de clientes
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={openPDFInNewTab}
            disabled={clientes.length === 0}
            title="Exportar clientes a PDF"
            className={`group relative inline-flex items-center justify-center
              w-12 h-12 rounded-full border transition-all duration-300
              ${
                isDark
                  ? "bg-slate-800/70 border-slate-700 hover:bg-slate-700"
                  : "bg-white border-slate-200 hover:bg-slate-50"
              }
              hover:shadow-lg hover:-translate-y-[2px]
              disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <FileText className="w-5 h-5 text-red-600 relative z-10" />
          </button>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-5 h-5" />
            Nuevo Cliente
          </button>
        </div>
      </div>

      {/* BÚSQUEDA Y FILTROS */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <SearchBar 
          value={search} 
          onChange={setSearch} 
          placeholder="Buscar por nombre o email..."
          className="w-full sm:w-100 py-4 px-4"
        />
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all relative ${
            isDark 
              ? 'bg-slate-800/40 hover:bg-slate-800 text-white border-slate-700' 
              : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200'
          }`}
        >
          <Filter className="w-5 h-5" />
          Filtros
          {/* 🆕 INDICADOR DE FILTROS ACTIVOS */}
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
          )}
        </button>
      </div>

      {/* 🆕 PANEL DE FILTROS CON COMPONENTE */}
      <FilterPanel isOpen={showFilters} title="Filtrar por fechas de registro">
        <ClientFilters 
          fechaDesde={fechaDesde}
          fechaHasta={fechaHasta}
          onFechaDesdeChange={setFechaDesde}
          onFechaHastaChange={setFechaHasta}
          onClearFilters={clearFilters}
        />
      </FilterPanel>

      {/* INFORMACIÓN DE PAGINACIÓN */}
      <PaginationInfo 
        startItem={startItem}
        endItem={endItem}
        totalCount={totalCount}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(value) => {
          setItemsPerPage(value)
          setCurrentPage(1)
        }}
        itemLabel="clientes"
        options={[10, 25, 50, 100]}
      />

      {/* TABLA */}
      <div className={`rounded-xl overflow-hidden shadow-sm border ${
        isDark ? 'bg-slate-800/20 border-slate-800/40' : 'bg-white border-slate-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <ClientTableHeader 
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
            <tbody className={`divide-y ${isDark ? 'divide-slate-800/40' : 'divide-slate-200'}`}>
              {isLoading ? (
                <TableSkeleton rows={5} columns={4} />
              ) : clientes.length === 0 ? (
                <EmptyState colSpan={4} />
              ) : (
                clientes.map((cliente) => (
                  <ClientTableRow 
                    key={cliente.id} 
                    cliente={cliente}
                    onViewDetails={(id) => console.log('Ver', id)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINACIÓN */}
        <div className={`px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t ${
          isDark ? 'border-slate-800/50' : 'border-slate-200'
        }`}>
          <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Página {currentPage} de {totalPages || 1}
          </span>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            isLoading={isLoading}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* MODAL */}
      <ModalRegistro 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCliente={handleAddCliente}
      />
    </div>
  )
}