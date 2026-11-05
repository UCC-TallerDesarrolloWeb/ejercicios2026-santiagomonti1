import { useEffect, useState } from 'react'
import PokeCard from '@components/PokeCard.jsx'
import '@styles/Poke.scss'

const API_URL = 'https://pokeapi.co/api/v2/pokemon/bulbasaur'

function Poke() {
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState(null)

  // useEffect con [] se ejecuta una sola vez, al montar la página
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`)
        return res.json()
      })
      .then((data) => {
        console.log(data) // para ver en la consola todo lo que devuelve la API
        // De toda la respuesta nos quedamos solo con lo que necesita la card
        setPokemon({
          id: data.id,
          nombre: data.name,
          imagen: data.sprites.front_default,
          tipos: data.types.map((t) => t.type.name),
          altura: data.height,
          peso: data.weight,
        })
      })
      .catch((err) => {
        console.error(err)
        setError('No se pudo cargar el pokémon.')
      })
  }, [])

  return (
    <div className="poke">
      <h1>Pokémon</h1>

      {error && <p className="poke-mensaje">{error}</p>}
      {/* mientras pokemon sea null, todavía no llegó la respuesta */}
      {!pokemon && !error && <p className="poke-mensaje">Cargando...</p>}

      {pokemon && (
        <div className="poke-lista">
          {/* ...pokemon pasa cada propiedad del objeto como una prop */}
          <PokeCard {...pokemon} />
        </div>
      )}
    </div>
  )
}

export default Poke
