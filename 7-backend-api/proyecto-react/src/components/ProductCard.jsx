import { formatPrice } from '@utils/formatPrice.js'

// Tarjeta de un producto de la tienda.
// onVerDetalle abre el modal; onAgregar llama a addToCart (lo maneja Store).
function ProductCard({ producto, puedeComprar, onVerDetalle, onAgregar }) {
  return (
    <div className="product-card">
      <img src={`/products/${producto.imagen}`} alt={producto.nombre} />
      <div className="product-card-body">
        <span className="product-card-categoria">{producto.categoria}</span>
        <h3>{producto.nombre}</h3>
        <p className="product-card-precio">{formatPrice(producto.precio)}</p>

        <div className="product-card-acciones">
          <button className="btn btn-secundario" onClick={() => onVerDetalle(producto)}>
            <span className="material-symbols-outlined">visibility</span>
            Ver detalle
          </button>
          {/* solo se puede agregar al carrito con la sesión iniciada */}
          {puedeComprar && (
            <button className="btn btn-primario" onClick={() => onAgregar(producto)} title="Agregar al carrito">
              <span className="material-symbols-outlined">add_shopping_cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
