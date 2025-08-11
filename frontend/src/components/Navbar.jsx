import React from 'react';
import { Link } from "react-router-dom";
import AutenticacionUser from '../pages/AutenticacionUser'
import BuscarEventos from '../pages/BuscarEventos.jsx'
import CrearEventoForm from '../pages/CrearEventoForm.jsx'
import MisEventos from '../pages/MisEventos.jsx'
import Ubicaciones from '../pages/Ubicaciones.jsx'
import './Navbar.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">SoundScout</Link>
        <ul className="navbar-nav">
          <li><Link to="/" className="nav-link">Inicio</Link></li>
          <li><Link to="/AutenticacionUser" className="nav-link">Autenticarme</Link></li>
          <li><Link to="/BuscarEventos" className="nav-link">Buscar Eventos</Link></li>
          <li><Link to="/Ubicaciones" className="nav-link">Ubicaciones</Link></li>
          <li><Link to="/CrearEventoForm" className="nav-link">Crear Evento</Link></li>
          <li><Link to="/MisEventos" className="nav-link">Mis Eventos</Link></li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;