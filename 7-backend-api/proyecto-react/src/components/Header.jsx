import { NavLink, useNavigate } from 'react-router-dom'

// Recibe por props si el usuario está logueado y la función para cerrar sesión
function Header({ logueado, onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  return (
    <header className="header">
      <span className="header-logo">Club Deportivo</span>
      <nav className="header-nav">
        {/* NavLink agrega la clase "active" al link de la ruta actual */}
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/actividades">Actividades</NavLink>
        <NavLink to="/poke">Pokémon</NavLink>
        {/* Punto 5: el botón de Logout solo aparece si está logueado */}
        {logueado && (
          <button className="header-logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  )
}

export default Header
