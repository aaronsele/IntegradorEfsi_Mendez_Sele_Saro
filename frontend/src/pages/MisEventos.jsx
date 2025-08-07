import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '../css/styles.css';

export default function MisEventos() {
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editandoId, setEditandoId] = useState(null);
  const [eventoEditado, setEventoEditado] = useState({});

  useEffect(() => {
    const fetchMisEventos = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No estás autenticado. Iniciá sesión para ver tus eventos.');
        setLoading(false);
        return;
      }

      let userId;
      try {
        const decoded = jwtDecode(token);
        userId = decoded.id;
      } catch (err) {
        setError('Token inválido.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/event/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const eventosDelUsuario = response.data.filter(
          (evento) => evento.creator_user?.id === userId
        );

        setEventos(eventosDelUsuario);
      } catch (err) {
        setError('No se pudieron cargar tus eventos.');
      } finally {
        setLoading(false);
      }
    };

    fetchMisEventos();
  }, []);

  const handleEliminar = async (id) => {
    const confirm = window.confirm('¿Estás seguro de que querés eliminar este evento?');
    if (!confirm) return;

    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:3000/api/event/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEventos(eventos.filter((e) => e.id !== id));
    } catch (err) {
      alert('Error al eliminar el evento.');
    }
  };

  const handleEditar = (evento) => { 
    setEditandoId(evento.id); 
    setEventoEditado({ ...evento }); 
  };

  const handleGuardar = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put('http://localhost:3000/api/event/', eventoEditado, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEventos(eventos.map((e) => (e.id === eventoEditado.id ? eventoEditado : e)));
      setEditandoId(null);
    } catch (err) {
      alert('Error al guardar los cambios.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventoEditado({ ...eventoEditado, [name]: value });
  };

  return (
    <div className="container">
      <div style={{
        width: '100%',
        height: '220px',
        backgroundImage: 'url(https://aablog.b-cdn.net/wp-content/uploads/2017/01/recitales-2017.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '18px',
        marginBottom: '2rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.15)'
      }} />
      <div className="section">
        <div className="text-center mb-2xl">
          <h1>Mis Eventos</h1>
          <p className="text-muted">Gestiona los eventos que has creado</p>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="loading"></div>
            <p className="text-muted mt-md">Cargando tus eventos...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <div className="card">
              <h3>Error</h3>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        ) : eventos.length === 0 ? (
          <div className="text-center">
            <div className="card">
              <h3>No tienes eventos</h3>
              <p className="text-muted">Aún no has creado ningún evento.</p>
              <a href="/CrearEventoForm" className="btn btn-primary mt-lg">
                Crear mi primer evento
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-xl">
            {eventos.map((evento) => (
              <div key={evento.id} className="card">
                {editandoId === evento.id ? (
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Nombre</label>
                      <input
                        id="name"
                        name="name"
                        className="form-input"
                        value={eventoEditado.name}
                        onChange={handleChange}
                        placeholder="Nombre del evento"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="description" className="form-label">Descripción</label>
                      <textarea
                        id="description"
                        name="description"
                        className="form-textarea"
                        value={eventoEditado.description}
                        onChange={handleChange}
                        placeholder="Descripción del evento"
                        rows="3"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-lg">
                      <div className="form-group">
                        <label htmlFor="start_date" className="form-label">Fecha</label>
                        <input
                          id="start_date"
                          type="date"
                          name="start_date"
                          className="form-input"
                          value={eventoEditado.start_date?.slice(0, 10)}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="duration_in_minutes" className="form-label">Duración (min)</label>
                        <input
                          id="duration_in_minutes"
                          name="duration_in_minutes"
                          type="number"
                          className="form-input"
                          value={eventoEditado.duration_in_minutes}
                          onChange={handleChange}
                          placeholder="120"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="price" className="form-label">Precio</label>
                      <input
                        id="price"
                        name="price"
                        type="number"
                        className="form-input"
                        value={eventoEditado.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                    
                    <div className="flex gap-md">
                      <button onClick={handleGuardar} className="btn btn-primary">
                        Guardar
                      </button>
                      <button onClick={() => setEditandoId(null)} className="btn btn-secondary">
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="card-header">
                      <h3 className="card-title">{evento.name}</h3>
                      <p className="card-subtitle">
                        {new Date(evento.start_date).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    
                    <div className="card-body">
                      <p className="mb-lg">{evento.description}</p>
                      
                      <div className="flex gap-md mb-lg">
                        <span className="badge badge-primary">{evento.duration_in_minutes} min</span>
                        <span className="badge badge-secondary">${evento.price}</span>
                      </div>
                      
                      <div className="flex gap-md">
                        <button 
                          onClick={() => handleEditar(evento)} 
                          className="btn btn-secondary"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => handleEliminar(evento.id)} 
                          className="btn btn-ghost"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}