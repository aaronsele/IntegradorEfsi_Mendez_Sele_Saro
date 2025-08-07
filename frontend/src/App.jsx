import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import './css/styles.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AutenticacionUser from './pages/AutenticacionUser'
import BuscarEventos from './pages/BuscarEventos.jsx'
import DetalleEvento from './pages/DetalleEvento.jsx'
import MisEventos from './pages/MisEventos.jsx'
import CrearEventoForm from './pages/CrearEventoForm.jsx'
import Ubicaciones from './pages/Ubicaciones.jsx'

export default function App() {
  return (  
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>           
            <Route path="/" element={<Home />} />
            <Route path="/AutenticacionUser" element={<AutenticacionUser />} />
            <Route path="/BuscarEventos" element={<BuscarEventos />} />
            <Route path="/eventos/:id" element={<DetalleEvento />} />
            <Route path="/MisEventos" element={<MisEventos />} />
            <Route path="/CrearEventoForm" element={<CrearEventoForm />} />
            <Route path="/Ubicaciones" element={<Ubicaciones />} />
            {/* Ruta catch-all para rutas no encontradas */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}