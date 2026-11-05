import { useEffect, useState } from 'react'
import PokeCard from '@components/PokeCard.jsx'
import '@styles/Poke.scss'

const API_URL = 'https://pokeapi.co/api/v2/pokemon'

// Trae UN pokémon por id o nombre y devuelve solo los datos que usa la card
const fetchPokemon = async (idONombre) => {
  const res = await fetch(`${API_URL}/${idONombre}`)
  if (!res.ok) throw new Error(`Error ${res.status} al pedir el pokémon ${idONombre}`)
  const data = await res.json()

  return {
    id: data.id,
    nombre: data.name,
    imagen: data.sprites.front_default,
    tipos: data.types.map((t) => t.type.name),
    altura: data.height,
    peso: data.weight,
  }
}

// Trae los pokémon del 1 al 20.
// Promise.all lanza los 20 fetch AL MISMO TIEMPO y espera a que terminen todos
// (más rápido que pedirlos uno por uno), y devuelve los resultados en el mismo orden.
const fetchAllPokemons = async (desde = 1, hasta = 20) => {
  const ids = Array.from({ length: hasta - desde + 1 }, (_, i) => desde + i) // [1, 2, ..., 20]
  return Promise.all(ids.map((id) => fetchPokemon(id)))
}

function Poke() {
  const [pokemons, setPokemons] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // useEffect con [] se ejecuta una sola vez, al montar la página
  useEffect(() => {
    fetchAllPokemons(1, 20)
      .then((lista) => {
        console.log(lista)
        setPokemons(lista)
      })
      .catch((err) => {
        console.error(err)
        setError('No se pudieron cargar los pokémon.')
      })
      .finally(() => setCargando(false))
  }, [])

  return (
    <div className="poke">
      <h1>Pokémon</h1>

      {cargando && <p className="poke-mensaje">Cargando...</p>}
      {error && <p className="poke-mensaje">{error}</p>}

      <div className="poke-lista">
        {pokemons.map((pokemon) => (
          // ...pokemon pasa cada propiedad del objeto como una prop
          <PokeCard key={pokemon.id} {...pokemon} />
        ))}
      </div>
    </div>
  )
}

export default Poke
