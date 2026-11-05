import { useOutletContext } from 'react-router-dom'
import Card from '@components/Card.jsx'
import { activities, diasSemana } from '@data/actividades.js'
import '@styles/Actividades.scss'

function Actividades() {
  // logueado viene del Layout a través del <Outlet context>
  const { logueado } = useOutletContext()

  const inscribirse = (nombre) => {
    alert(`Te inscribiste en ${nombre}`)
  }

  return (
    <div className="actividades">
      <h1>Actividades</h1>

      <div className="actividades-lista">
        {activities.map((actividad) => (
          // titulo y subtitulo van por props; lo de adentro llega a la Card como children
          <Card
            key={actividad.nombre}
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
