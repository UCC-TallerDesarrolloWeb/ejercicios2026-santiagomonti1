import '@styles/PokeCard.scss'

// Muestra un pokémon. Recibe los datos ya procesados por props,
// así sirve tanto para uno solo (bulbasaur) como para una lista.
function PokeCard({ id, nombre, imagen, tipos, altura, peso }) {
  return (
    <div className="poke-card">
      <span className="poke-card-id">#{String(id).padStart(3, '0')}</span>
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>

      <div className="poke-card-tipos">
        {tipos.map((tipo) => (
          <span key={tipo} className={`poke-tipo poke-tipo-${tipo}`}>
            {tipo}
          </span>
        ))}
      </div>

      <div className="poke-card-datos">
        {/* la API devuelve la altura en decímetros y el peso en hectogramos */}
        <span>Altura: {altura / 10} m</span>
        <span>Peso: {peso / 10} kg</span>
      </div>
    </div>
  )
}

export default PokeCard
