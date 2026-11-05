import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCart, updateQty, removeItem, deleteCart } from '@api/cart.js'
import { formatPrice } from '@utils/formatPrice.js'
import '@styles/Cart.scss'

function Cart() {
  const [items, setItems] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // getCart: trae el carrito al entrar a la página
  useEffect(() => {
    getCart()
      .then(setItems)
      .catch((err) => {
        console.error(err)
        setError('No se pudo cargar el carrito. ¿Está corriendo "npm run services"?')
      })
      .finally(() => setCargando(false))
  }, [])

  // updateQty: cambia la cantidad en el servidor y después en el estado
  const cambiarCantidad = async (item, cantidad) => {
    if (cantidad < 1) return quitar(item.id) // bajar de 1 equivale a quitar el producto
    const actualizado = await updateQty(item.id, cantidad)
    setItems((prev) => prev.map((i) => (i.id === item.id ? actualizado : i)))
  }

  // removeItem: borra un producto del carrito
  const quitar = async (id) => {
    await removeItem(id)
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  // deleteCart: vacía todo el carrito
  const vaciar = async () => {
    if (!confirm('¿Vaciar el carrito?')) return
    await deleteCart()
    setItems([])
  }

  // reduce suma los subtotales y las cantidades de todos los ítems
  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  const cantidadTotal = items.reduce((acc, item) => acc + item.cantidad, 0)

  if (cargando) return <p className="cart-aviso">Cargando carrito...</p>
  if (error) return <p className="cart-aviso cart-error">{error}</p>

  return (
    <div className="cart">
      <h1>
        <span className="material-symbols-outlined">shopping_cart</span>
        Carrito
      </h1>

      {items.length === 0 ? (
        <div className="cart-vacio">
          <span className="material-symbols-outlined">remove_shopping_cart</span>
          <p>Tu carrito está vacío.</p>
          <Link to="/store" className="btn btn-primario">
            <span className="material-symbols-outlined">storefront</span>
            Ir a la tienda
          </Link>
        </div>
      ) : (
        <>
          <ul className="cart-lista">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={`/products/${item.imagen}`} alt={item.nombre} />

                <div className="cart-item-info">
                  <h3>{item.nombre}</h3>
                  {item.talle !== 's/talle' && <span>Talle: {item.talle}</span>}
                  <span>{formatPrice(item.precio)} c/u</span>
                </div>

                <div className="cart-cantidad">
                  <button onClick={() => cambiarCantidad(item, item.cantidad - 1)} aria-label="Restar uno">
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => cambiarCantidad(item, item.cantidad + 1)} aria-label="Sumar uno">
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>

                <span className="cart-subtotal">{formatPrice(item.precio * item.cantidad)}</span>

                <button className="cart-quitar" onClick={() => quitar(item.id)} aria-label="Quitar producto" title="Quitar">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-resumen">
            <button className="btn btn-peligro" onClick={vaciar}>
              <span className="material-symbols-outlined">delete_sweep</span>
              Vaciar carrito
            </button>
            <div className="cart-total">
              <span>{cantidadTotal} {cantidadTotal === 1 ? 'producto' : 'productos'}</span>
              <strong>Total: {formatPrice(total)}</strong>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
