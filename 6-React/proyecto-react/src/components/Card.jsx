import '@styles/Card.scss'

// Componente reutilizable: recibe título y subtítulo por props,
// y el contenido de adentro (lo que va entre <Card> y </Card>) en "children"
function Card({ titulo, subtitulo, children }) {
  return (
    <div className="card">
      <h2 className="card-titulo">{titulo}</h2>
      {subtitulo && <p className="card-subtitulo">{subtitulo}</p>}
      <div className="card-contenido">{children}</div>
    </div>
  )
}

export default Card
