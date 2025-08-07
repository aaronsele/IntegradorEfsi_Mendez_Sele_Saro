import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DetalleEvento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);
  const [error, setError] = useState('');
  const [inscripto, setInscripto] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/event/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setEvento(res.data);
        setInscripto(res.data.user_enrolled || false);
      } catch (err) {
        setError('Error al obtener el evento');
      } finally {
        setLoading(false);
      }
    };
    fetchEvento();
  }, [id, token]);

  const manejarInscripcion = async () => {
    try {
      if (!token) {
        alert('Inicia sesión para inscribirte');
        return;
      }

      if (!inscripto) {
        await axios.post(`http://localhost:3000/api/event/${id}/enrollment`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInscripto(true);
        setError('');
      } else {
        await axios.delete(`http://localhost:3000/api/event/${id}/enrollment`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInscripto(false);
        setError('');
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      const msg = err.response?.data?.error;
      
      if (msg === 'No puedes inscribirte a tu propio evento') {
        setError('No puedes inscribirte a tu propio evento.');
      } else {
        setError(msg || 'Error al inscribirse o cancelar');
      }
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="section">
          <div className="text-center">
            <div className="loading"></div>
            <p className="text-muted mt-md">Cargando evento...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!evento) {
    return (
      <div className="container">
        <div className="section">
          <div className="text-center">
            <div className="card">
              <h3>Evento no encontrado</h3>
              <p className="text-muted">El evento que buscas no existe o ha sido eliminado.</p>
              <button onClick={() => navigate('/')} className="btn btn-primary mt-lg">
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const {
    name,
    description,
    start_date,
    duration_in_minutes,
    price,
    creator_user,
    event_location,
    tags,
  } = evento;

  const esCreador = creator_user?.id === Number(userId);

  return (
    <div className="container">
      <div className="section">
        <div className="mb-lg">
          <button 
            onClick={() => navigate('/')} 
            className="btn btn-ghost"
          >
            ← Volver
          </button>
        </div>

        <div className="grid grid-cols-2 gap-xl">
          {/* Información Principal */}
          <div className="card">
            <div className="card-header">
              <h1 className="card-title">{name}</h1>
              <p className="card-subtitle">
                {new Date(start_date).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            
            <div className="card-body">
              <p className="mb-lg">{description}</p>
              
              <div className="flex gap-md mb-lg">
                <span className="badge badge-primary">{duration_in_minutes} min</span>
                <span className="badge badge-secondary">${price}</span>
                {tags && tags.map(tag => (
                  <span key={tag.id} className="badge">{tag.name}</span>
                ))}
              </div>

              {error && (
                <div className="p-md bg-red-50 rounded border border-red-200">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {token && !esCreador && (
                <button 
                  className={`btn btn-lg w-full ${inscripto ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={manejarInscripcion}
                >
                  {inscripto ? 'Cancelar inscripción' : 'Inscribirme'}
                </button>
              )}

              {token && esCreador && (
                <div className="p-md bg-blue-50 rounded border border-blue-200">
                  <p className="text-blue-600">
                    <em>No puedes inscribirte a tu propio evento.</em>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Información Adicional */}
          <div className="space-y-lg">
            {/* Ubicación */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Ubicación</h3>
              </div>
              <div className="card-body">
                <p><strong>Provincia:</strong> {event_location?.location?.province?.name}</p>
                <p><strong>Localidad:</strong> {event_location?.location?.name}</p>
                <p><strong>Dirección:</strong> {event_location?.full_address}</p>
              </div>
            </div>

            {/* Organizador */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Organizador</h3>
              </div>
              <div className="card-body">
                <p>
                  <strong>{creator_user?.first_name} {creator_user?.last_name}</strong>
                </p>
                <p className="text-muted">@{creator_user?.username}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
