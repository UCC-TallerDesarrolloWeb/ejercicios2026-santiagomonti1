import { useEffect, useState } from 'react'
import { formatPrice } from '@utils/formatPrice.js'
import '@styles/ProductModal.scss'

// Modal con el detalle de un producto. Se muestra solo si recibe un producto.
function ProductModal({ producto, puedeComprar, onCerrar, onAgregar }) {
  const [talle, setTalle] = useState(producto.talle[0])

  // Cerrar el modal con la tecla Escape
  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onCerrar()
    window.addEventListener('keydown', handleKey)
    // la función que devuelve el useEffect se ejecuta al cerrar el modal: quita el listener
    return () => window.removeEventListener('keydown', handleKey)
  }, [onCerrar])

  const sinTalle = producto.talle.length === 1 && producto.talle[0] === 's/talle'

  return (
    // clic en el fondo oscuro -> cierra
    <div className="modal-fondo" onClick={onCerrar}>
      {/* stopPropagation: un clic dentro del modal no llega al fondo */}
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-cerrar" onClick={onCerrar} aria-label="Cerrar">
          <span className="material-symbols-outlined">close</span>
        </button>

        <img src={`/products/${producto.imagen}`} alt={producto.nombre} />

        <div className="modal-info">
          <span className="modal-categoria">{producto.categoria} · {producto.marca}</span>
          <h2>{producto.nombre}</h2>
          <p>{producto.description}</p>
          <p className="modal-precio">{formatPrice(producto.precio)}</p>

          {!sinTalle && (
            <label className="modal-talle">
              Talle
              <select value={talle} onChange={(e) => setTalle(e.target.value)}>
                {producto.talle.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>
          )}

          <div className="modal-acciones">
            {puedeComprar ? (
              <button className="btn btn-primario" onClick={() => onAgregar(producto, talle)}>
                <span className="material-symbols-outlined">add_shopping_cart</span>
                Agregar al carrito
              </button>
            ) : (
              <span className="modal-aviso">Iniciá sesión para comprar</span>
            )}
            <a href={producto.web} target="_blank" rel="noreferrer" className="modal-web">
              Ver en la web
              <span className="material-symbols-outlined">open_in_new</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
