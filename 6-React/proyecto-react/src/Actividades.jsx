import { activities, diasSemana } from './data/actividades.js'
import './styles/Actividades.scss'

function Actividades() {
  return (
    <div className="actividades">
      <h1>Actividades</h1>

      <div className="actividades-lista">
        {/* map recorre el arreglo y devuelve una card por actividad */}
        {activities.map((actividad) => (
          <div className="actividad-card" key={actividad.nombre}>
            <h2>{actividad.nombre}</h2>
            <p>{actividad.descripcion}</p>

            <table>
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default Actividades
