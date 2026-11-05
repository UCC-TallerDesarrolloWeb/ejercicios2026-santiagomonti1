import { Link, useOutletContext } from 'react-router-dom'

function Home() {
  const { logueado } = useOutletContext()

  return (
    <div className="home">
      <h1>Bienvenido al Club Deportivo</h1>
      <p>Conocé nuestras actividades y sus horarios.</p>
      {logueado ? (
        <Link to="/actividades" className="home-boton">Ver actividades</Link>
      ) : (
        <Link to="/login" className="home-boton">Iniciar sesión para inscribirte</Link>
      )}
    </div>
  )
}

export default Home
