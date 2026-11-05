import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Home.jsx'
import Login from './Login.jsx'
import Actividades from './Actividades.jsx'

function App() {
  // El estado del login vive acá para que lo compartan el Header y las páginas
  const [logueado, setLogueado] = useState(false)

  return (
    <Routes>
      {/* Ruta padre: el Layout. Las rutas hijas se muestran en su <Outlet /> */}
      <Route
        path="/"
        element={
          <Layout
            logueado={logueado}
            onLogin={() => setLogueado(true)}
            onLogout={() => setLogueado(false)}
          />
        }
      >
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="actividades" element={<Actividades />} />
      </Route>
    </Routes>
  )
}

export default App
