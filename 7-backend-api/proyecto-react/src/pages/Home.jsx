import { actividadesHome } from '@data/home.js'
import '@styles/Home.scss'

function Home() {
  return (
    <div className="home">
      <div className="home-cards">
        {actividadesHome.map((actividad) => (
          <div className="home-card" key={actividad.titulo}>
            <img src={actividad.imagen} alt={actividad.titulo} />
            <h3>{actividad.titulo}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
