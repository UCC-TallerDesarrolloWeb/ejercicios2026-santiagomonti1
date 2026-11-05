import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Card from '@components/Card.jsx'
import { diasSemana } from '@data/actividades.js'
import { getActivities } from '@api/activities.js'
import '@styles/Actividades.scss'

function Actividades() {
  // logueado viene del Layout a través del <Outlet context>
  const { logueado } = useOutletContext()

  // Estados para los datos, la carga y un posible error
  const [activities, setActivities] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // useEffect con [] se ejecuta una sola vez, cuando se monta el componente
  useEffect(() => {
    getActivities()
      .then((data) => setActivities(data))
      .catch((err) => {
        console.error(err)
        setError('No se pudieron cargar las actividades. ¿Está corriendo "npm run services"?')
      })
      .finally(() => setCargando(false))
  }, [])

  const inscribirse = (nombre) => {
    alert(`Te inscribiste en ${nombre}`)
  }

  return (
    <div className="actividades">
      <h1>Actividades</h1>

      {cargando && <p className="actividades-mensaje">Cargando actividades...</p>}
      {error && <p className="actividades-mensaje actividades-error">{error}</p>}

      <div className="actividades-lista">
        {activities.map((actividad) => (
          // titulo y subtitulo van por props; lo de adentro llega a la Card como children
          <Card
            key={actividad.id}
            titulo={actividad.nombre}
            subtitulo={actividad.descripcion}
          >
            <table className="horarios">
              <thead>
                <tr>
                  <th>Día</th>
                  <th>Horario</th>
                </tr>
              </thead>
              <tbody>
                {actividad.horarios.map((horario) => (
                  <tr key={horario.dia}>
                    {/* el número de día se usa como índice de diasSemana */}
                    <td>{diasSemana[horario.dia]}</td>
                    {/* las claves con guion se leen con corchetes */}
                    <td>{horario['hora-inicio']} a {horario['hora-fin']}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* el botón solo se muestra si el usuario está logueado */}
            {logueado && (
              <button className="actividad-boton" onClick={() => inscribirse(actividad.nombre)}>
                Inscribirme
              </button>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Actividades
