import { useState } from 'react'
import './styles/Login.scss'

function Login() {
  // Estado de los inputs (componentes controlados)
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault() // evita que el formulario recargue la página

    if (usuario === 'admin' && password === 'admin') {
      console.log('Login OK')
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
