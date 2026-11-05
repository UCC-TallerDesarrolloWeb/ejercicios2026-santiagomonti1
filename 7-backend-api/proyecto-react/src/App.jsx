import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@components/Layout.jsx'
import Home from '@pages/Home.jsx'
import Login from '@pages/Login.jsx'
import Actividades from '@pages/Actividades.jsx'
import Poke from '@pages/Poke.jsx'
import Store from '@pages/Store.jsx'
import Cart from '@pages/Cart.jsx'

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
        <Route path="poke" element={<Poke />} />
        <Route path="store" element={<Store />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  )
}

export default App
