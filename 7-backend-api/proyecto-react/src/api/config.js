// La URL del servicio sale del archivo .env.
// Vite solo expone al front las variables que empiezan con VITE_
export const BASE_URL = import.meta.env.VITE_BASE_URL

// Hace el fetch, revisa que la respuesta sea correcta y devuelve el JSON
export const request = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`Error ${res.status} en ${options.method ?? 'GET'} /${endpoint}`)
  return res.json()
}
