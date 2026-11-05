import { Outlet } from 'react-router-dom'
import Header from '@components/Header.jsx'
import Footer from '@components/Footer.jsx'
import '@styles/Layout.scss'

// Punto 3: el layout siempre muestra Header y Footer.
// En <Outlet /> se renderiza la página de la ruta actual (Home, Login o Actividades).
function Layout({ logueado, onLogin, onLogout }) {
  return (
    <div className="layout">
      <Header logueado={logueado} onLogout={onLogout} />
      <main className="main">
        {/* context: datos que pueden leer las páginas con useOutletContext() */}
        <Outlet context={{ logueado, onLogin }} />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
