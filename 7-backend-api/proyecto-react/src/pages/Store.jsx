import { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import ProductCard from '@components/ProductCard.jsx'
import ProductModal from '@components/ProductModal.jsx'
import { getProducts } from '@api/products.js'
import { addToCart } from '@api/cart.js'
import '@styles/Store.scss'

function Store() {
  const { logueado } = useOutletContext()

  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  // producto que se muestra en el modal (null = modal cerrado)
  const [seleccionado, setSeleccionado] = useState(null)
  const [mensaje, setMensaje] = useState(null)

  useEffect(() => {
    getProducts()
      .then(setProductos)
      .catch((err) => {
        console.error(err)
        setError('No se pudieron cargar los productos. ¿Está corriendo "npm run services"?')
      })
      .finally(() => setCargando(false))
  }, [])

  const handleAgregar = async (producto, talle) => {
    try {
      await addToCart(producto, talle)
      setSeleccionado(null)
      setMensaje(`"${producto.nombre}" se agregó al carrito`)
      setTimeout(() => setMensaje(null), 2500)
    } catch (err) {
      console.error(err)
      setMensaje('No se pudo agregar al carrito')
    }
  }

  return (
    <div className="store">
      <div className="store-encabezado">
        <h1>Tienda</h1>
        <Link to="/cart" className="btn btn-primario">
          <span className="material-symbols-outlined">shopping_cart</span>
          Ver carrito
        </Link>
      </div>

      {!logueado && <p className="store-aviso">Iniciá sesión para agregar productos al carrito.</p>}
      {cargando && <p className="store-aviso">Cargando productos...</p>}
      {error && <p className="store-aviso store-error">{error}</p>}

      <div className="store-lista">
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            puedeComprar={logueado}
            onVerDetalle={setSeleccionado}
            onAgregar={handleAgregar}
          />
        ))}
      </div>

      {seleccionado && (
        <ProductModal
          // key: si se abre otro producto, el modal arranca de cero (talle por defecto)
          key={seleccionado.id}
          producto={seleccionado}
          puedeComprar={logueado}
          onCerrar={() => setSeleccionado(null)}
          onAgregar={handleAgregar}
        />
      )}

      {mensaje && <div className="toast">{mensaje}</div>}
    </div>
  )
}

export default Store
