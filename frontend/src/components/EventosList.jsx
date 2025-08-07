import React, { useEffect, useState } from 'react';
import EventoCard from '../components/EventoCard';
import axios from 'axios';

const EventosList = () => {
  const [eventos, setEventos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [hayMas, setHayMas] = useState(false);
  const [loading, setLoading] = useState(false);
  const limite = 6;

  useEffect(() => {
    const obtenerEventos = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/api/event?page=${pagina}&limit=${limite}`);
        
        if (Array.isArray(res.data)) {
          setEventos(res.data);
          // Solo hay más páginas si recibimos exactamente el límite de eventos
          // y no es la primera página (para evitar mostrar paginación innecesaria)
          setHayMas(res.data.length === limite);
        } else {
          console.error("Respuesta inesperada del servidor:", res.data);
          setEventos([]);
          setHayMas(false);
        }
      } catch (error) {
        console.error("Error al obtener eventos:", error);
        setEventos([]);
        setHayMas(false);
      } finally {
        setLoading(false);
      }
    };

    obtenerEventos();
  }, [pagina]);

  const paginaAnterior = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
    }
  };

  const paginaSiguiente = () => {
    if (hayMas && eventos.length === limite) {
      setPagina(pagina + 1);
    }
  };

  // Solo mostrar paginación si:
  // 1. Hay eventos
  // 2. Y (hay más páginas O estamos en una página > 1)
  const mostrarPaginacion = eventos.length > 0 && (hayMas || pagina > 1);

  return (
    <div className="container">
      <div className="section">
        <div className="text-center mb-2xl">
          <h1>Eventos Disponibles</h1>
          <p className="text-muted">Descubre eventos increíbles cerca de ti</p>
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
              <p className="text-muted">Intenta más tarde o crea un nuevo evento.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-xl">
            {eventos.map((evento) => (
              <EventoCard key={evento.id} evento={evento} />
            ))}
          </div>
        )}

        {mostrarPaginacion && (
          <div className="flex justify-center gap-md mt-2xl">
            <button 
              onClick={paginaAnterior} 
              className="btn btn-secondary" 
              disabled={pagina === 1}
            >
              Anterior
            </button>
            <span className="flex items-center px-md">
              Página {pagina}
            </span>
            <button 
              onClick={paginaSiguiente} 
              className="btn btn-secondary" 
              disabled={!hayMas || eventos.length < limite}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventosList;