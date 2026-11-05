import { request } from './config.js'

// GET /cart
export const getCart = () => request('cart')

// POST /cart
// Si el producto (con el mismo talle) ya está en el carrito, se suma 1 a la cantidad
// en vez de crear otro ítem repetido.
export const addToCart = async (producto, talle = producto.talle[0]) => {
  const cart = await getCart()
  const existente = cart.find((item) => item.productId === producto.id && item.talle === talle)

  if (existente) {
    return updateQty(existente.id, existente.cantidad + 1)
  }

  return request('cart', {
    method: 'POST',
    body: JSON.stringify({
      productId: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      talle,
      cantidad: 1,
    }),
  })
}

// PATCH /cart/:id -> modifica solo la cantidad del ítem
export const updateQty = (id, cantidad) =>
  request(`cart/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ cantidad }),
  })

// DELETE /cart/:id
export const removeItem = (id) => request(`cart/${id}`, { method: 'DELETE' })

// DELETE /cart
// json-server no permite borrar una colección entera de una vez,
// así que se borra cada ítem del carrito (todos en paralelo con Promise.all).
export const deleteCart = async () => {
  const cart = await getCart()
  await Promise.all(cart.map((item) => removeItem(item.id)))
  return []
}
