import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventoCard from '../components/EventoCard';
import axios from 'axios';
import './Home.css'; 

export default function Home() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/event');
        if (Array.isArray(response.data)) {
          setEventos(response.data.slice(0, 4));
        } else {
          console.error('Respuesta inesperada del servidor:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener eventos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const scrollToEventos = () => {
    const eventosSection = document.getElementById('eventos');
    if (eventosSection) {
      eventosSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <section
        className="hero"
        style={{
          backgroundImage:
            'url(https://www.futuro.cl/wp-content/uploads/2019/06/Rammstein_web.jpg)',
        }}
      >
        <div className="container hero-container">
          <h1 className="hero-title animate-fade-in">
            Explora Eventos Emocionantes
          </h1>
          <p className="hero-subtitle animate-slide-in-left">
            Encuentra y participa en los mejores eventos cerca de ti. 
            Desde conferencias hasta conciertos, Descubre el proximo.
          </p>
          <div className="flex gap-md justify-center">
            <button
              onClick={scrollToEventos}
              className="btn btn-primary btn-lg"
            >
              Explorar Eventos
            </button>
            <Link to="/CrearEventoForm" className="btn btn-secondary btn-lg">
              Crear Un Evento
            </Link>
          </div>
        </div>
      </section>

      <section id="eventos" className="section-sm">
        <div className="container">
          <div className="text-center mb-2xl">
            <h2>Eventos Más Destacados</h2>
            <p className="text-muted">Los eventos más populares del último tiempo</p>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="loading"></div>
              <p className="text-muted mt-md">Cargando eventos...</p>
            </div>
          ) : eventos.length === 0 ? (
            <div className="text-center">
              <div className="card">
                <h3>No hay eventos disponibles</h3>
                <p className="text-muted">
                  Sé el primero en crear un evento emocionante.
                </p>
                <Link to="/CrearEventoForm" className="btn btn-primary mt-lg">
                  Crear Evento
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-xl">
              {eventos.map((evento) => (
                <EventoCard key={evento.id} evento={evento} />
              ))}
            </div>
          )}

          {eventos.length > 0 && (
            <div className="text-center mt-2xl">
              <Link to="/BuscarEventos" className="btn btn-secondary btn-lg">
                Ver Todos los Eventos
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
