"use client"

import { UserCircle, Mail, Phone, MapPin, Plus } from 'lucide-react'
import ModalRegistro from '@/components/client/ModalRegistro'
import { useTheme } from '@/context/ThemeContext'
import { useState, useEffect } from 'react' // 1. Agregamos useEffect
import { createClient } from "@/lib/supabase/client" // 2. Importamos tu cliente

export default function ClientesPage() {
  const { isDarkMode: isDark } = useTheme()
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // 3. Inicializamos clientes como un array vacío
  const [clientes, setClientes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  // 4. Función para traer datos desde Supabase
  const fetchClientes = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClientes(data || []);
    } catch (error) {
      console.error('Error cargando clientes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 5. Cargar datos al montar el componente
  useEffect(() => {
    fetchClientes();
  }, []);

  const agregarCliente = (nuevoCliente: any) => {
    // Al registrar uno nuevo, lo ponemos al principio de la lista actual
    setClientes((prev) => [nuevoCliente, ...prev]);
  };

  return (
    <div className="p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'} mb-2`}>Clientes</h1>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Gestiona tu cartera de clientes</p>
          </div>
          <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium shadow-lg shadow-blue-500/20">
            <Plus className="w-5 h-5" />
            Nuevo Cliente
          </button>
        </div>

        {/* ESTADÍSTICAS RÁPIDAS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className={`${isDark ? 'bg-slate-800/20 border-slate-800/40' : 'bg-white border-slate-200'} border rounded-xl p-6`}>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-2 uppercase tracking-wider font-semibold`}>Total Clientes</p>
            <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{clientes.length}</p>
          </div>
          {/* ... otros stats ... */}
        </div>

        {/* TABLA DE CLIENTES */}
        <div className={`${isDark ? 'bg-slate-800/20 border-slate-800/40' : 'bg-white border-slate-200'} border rounded-xl overflow-hidden shadow-sm`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${isDark ? 'bg-slate-800/40 border-slate-700/50' : 'bg-slate-50 border-slate-200'} border-b`}>
                <tr>
                  <th className={`text-left px-8 py-4 text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider`}>Cliente</th>
                  <th className={`text-left px-8 py-4 text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider`}>Email</th>
                  <th className={`text-left px-8 py-4 text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider`}>Teléfono</th>
                  <th className={`text-left px-8 py-4 text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider`}>Ciudad</th>
                  <th className={`text-center px-8 py-4 text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider`}>Acciones</th>
                </tr>
              </thead>
              <tbody className={`${isDark ? 'divide-slate-800/40' : 'divide-slate-200'} divide-y`}>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-slate-500">Cargando clientes...</td>
                  </tr>
                ) : clientes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-slate-500">No hay clientes registrados.</td>
                  </tr>
                ) : (
                  clientes.map((cliente) => (
                    <tr key={cliente.id} className={`${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'} transition-colors`}>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full ${isDark ? 'bg-blue-600/20' : 'bg-blue-100'} flex items-center justify-center flex-shrink-0`}>
                            <UserCircle className={`w-7 h-7 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                          </div>
                          <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{cliente.nombre}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-400">{cliente.email}</td>
                      <td className="px-8 py-5 text-sm text-slate-400">{cliente.telefono}</td>
                      <td className="px-8 py-5 text-sm text-slate-400">{cliente.ciudad}</td>
                      <td className="px-8 py-5 text-center">
                         <button className="text-blue-500 hover:underline">Ver detalles</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <ModalRegistro 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onAddCliente={agregarCliente}
      />
    </div>
  )
}