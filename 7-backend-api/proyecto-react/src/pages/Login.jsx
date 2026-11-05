import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import '@styles/Login.scss'

function Login() {
  // useNavigate permite cambiar de ruta desde el código
  const navigate = useNavigate()
  // onLogin viene del Layout a través del <Outlet context>
  const { onLogin } = useOutletContext()

  // Estado de los inputs (componentes controlados)
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault() // evita que el formulario recargue la página

    if (usuario === 'admin' && password === 'admin') {
      console.log('Login OK')
      onLogin()
      navigate('/actividades')
    } else {
      console.log('Login Incorrecto')
    }
  }

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export default Login
