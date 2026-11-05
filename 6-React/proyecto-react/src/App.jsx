import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login.jsx'
import Actividades from './Actividades.jsx'

function App() {
  return (
    <Routes>
      {/* La raíz redirige al login */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/actividades" element={<Actividades />} />
    </Routes>
  )
}

export default App
