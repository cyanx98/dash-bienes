import { startOfDay, endOfDay } from 'date-fns'
import { fromZonedTime } from 'date-fns-tz'

const PERU_TZ = 'America/Lima'

// Inicio del día en UTC desde Perú
export const fechaInicioUTC = (fecha: string) => {
  return fromZonedTime(startOfDay(new Date(fecha)), PERU_TZ).toISOString()
}

// Fin del día en UTC desde Perú
export const fechaFinUTC = (fecha: string) => {
  return fromZonedTime(endOfDay(new Date(fecha)), PERU_TZ).toISOString()
}
