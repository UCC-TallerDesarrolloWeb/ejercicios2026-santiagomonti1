// Imágenes en src/assets: se IMPORTAN y Vite las procesa al compilar
// (les agrega un hash al nombre y las incluye en el build)
import zumba from '@assets/home/zumba.jpg'
import funcional from '@assets/home/funcional.jpg'
import '@styles/Home.scss'

// Imágenes en public: NO se importan, se usan con una ruta absoluta desde la raíz ("/")
const actividades = [
  { titulo: 'Taekwondo', imagen: '/home/taekwondo.jpg' }, // public/home
  { titulo: 'Yoga', imagen: '/home/yoga.webp' },          // public/home
  { titulo: 'Zumba', imagen: zumba },                     // src/assets/home
  { titulo: 'Funcional', imagen: funcional },             // src/assets/home
]

function Home() {
  return (
    <div className="home">
      <div className="home-cards">
        {actividades.map((actividad) => (
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
