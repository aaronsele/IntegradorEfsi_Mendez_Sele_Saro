import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Ubicaciones() {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [nuevaUbicacion, setNuevaUbicacion] = useState({
    name: '',
    full_address: '',
    max_capacity: '',
    latitude: '',
    longitude: '',
    id_location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const token = localStorage.getItem('token');

  const fetchUbicaciones = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/event-location', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUbicaciones(response.data);
      setError('');
    } catch (err) {
      console.error('Error al obtener ubicaciones:', err.response || err);
      setError('No se pudieron cargar las ubicaciones.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUbicaciones();
  }, []);

  const handleCrear = async () => {
    const { name, full_address, max_capacity, latitude, longitude, id_location } = nuevaUbicacion;

    if (!name || !full_address || !max_capacity || !latitude || !longitude || !id_location) {
      setError('Completá todos los campos antes de guardar.');
      return;
    }

    setCreating(true);
    try {
      await axios.post(
        'http://localhost:3000/api/event-location',
        {
          name,
          full_address,
          max_capacity: parseInt(max_capacity, 10),
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          id_location: parseInt(id_location, 10)
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNuevaUbicacion({
        name: '',
        full_address: '',
        max_capacity: '',
        latitude: '',
        longitude: '',
        id_location: ''
      });
      setError('');
      fetchUbicaciones();
    } catch (err) {
      console.error('Error al crear ubicación:', err.response || err);
      setError('No se pudo crear la ubicación.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="container">
      <div style={{
        width: '100%',
        height: '220px',
        backgroundImage: 'url(https://www.infozona.com.ar/storage/2023/01/Recitales.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '18px',
        marginBottom: '2rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.15)'
      }} />
      <div className="section">
        <div className="text-center mb-2xl">
          <h1>Ubicaciones</h1>
          <p className="text-muted">Gestiona las ubicaciones para tus eventos</p>
        </div>

        {/* Formulario de creación */}
        <div className="card mb-2xl">
          <div className="card-header">
            <h3 className="card-title">Crear Nueva Ubicación</h3>
            <p className="card-subtitle">Agrega una nueva ubicación para eventos</p>
          </div>
          
          <div className="card-body">
            {error && (
              <div className="mb-lg p-md bg-red-50 rounded border border-red-200">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-lg">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Nombre *</label>
                <input
                  id="name"
                  type="text"
                  className="form-input"
                  placeholder="Nombre de la ubicación"
                  value={nuevaUbicacion.name}
                  onChange={(e) => setNuevaUbicacion({ ...nuevaUbicacion, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="max_capacity" className="form-label">Capacidad Máxima *</label>
                <input
                  id="max_capacity"
                  type="number"
                  className="form-input"
                  placeholder="100"
                  value={nuevaUbicacion.max_capacity}
                  onChange={(e) => setNuevaUbicacion({ ...nuevaUbicacion, max_capacity: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="full_address" className="form-label">Dirección Completa *</label>
              <input
                id="full_address"
                type="text"
                className="form-input"
                placeholder="Calle, número, ciudad, provincia"
                value={nuevaUbicacion.full_address}
                onChange={(e) => setNuevaUbicacion({ ...nuevaUbicacion, full_address: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-3 gap-lg">
              <div className="form-group">
                <label htmlFor="latitude" className="form-label">Latitud *</label>
                <input
                  id="latitude"
                  type="number"
                  step="any"
                  className="form-input"
                  placeholder="-34.6037"
                  value={nuevaUbicacion.latitude}
                  onChange={(e) => setNuevaUbicacion({ ...nuevaUbicacion, latitude: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="longitude" className="form-label">Longitud *</label>
                <input
                  id="longitude"
                  type="number"
                  step="any"
                  className="form-input"
                  placeholder="-58.3816"
                  value={nuevaUbicacion.longitude}
                  onChange={(e) => setNuevaUbicacion({ ...nuevaUbicacion, longitude: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="id_location" className="form-label">ID de Ubicación *</label>
                <input
                  id="id_location"
                  type="number"
                  className="form-input"
                  placeholder="1"
                  value={nuevaUbicacion.id_location}
                  onChange={(e) => setNuevaUbicacion({ ...nuevaUbicacion, id_location: e.target.value })}
                />
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={handleCrear} 
                className="btn btn-primary btn-lg"
                disabled={creating}
              >
                {creating ? "Creando..." : "Guardar Ubicación"}
              </button>
            </div>
          </div>
        </div>

        {/* Lista de ubicaciones */}
        <div className="text-center mb-2xl">
          <h2>Ubicaciones Creadas</h2>
          <p className="text-muted">Todas las ubicaciones disponibles para eventos</p>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="loading"></div>
            <p className="text-muted mt-md">Cargando ubicaciones...</p>
          </div>
        ) : ubicaciones.length === 0 ? (
          <div className="text-center">
            <div className="card">
              <h3>No hay ubicaciones</h3>
              <p className="text-muted">Aún no se han registrado ubicaciones.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-xl">
            {ubicaciones.map((ubi) => (
              <div className="card" key={ubi.id}>
                <div className="card-header">
                  <h3 className="card-title">{ubi.name}</h3>
                  <p className="card-subtitle">Capacidad: {ubi.max_capacity} personas</p>
                </div>
                
                <div className="card-body">
                  <p><strong>Dirección:</strong> {ubi.full_address}</p>
                  <p><strong>Coordenadas:</strong> {ubi.latitude}, {ubi.longitude}</p>
                  <p><strong>Provincia:</strong> {ubi.location?.province?.name || 'Sin provincia'}</p>
                  <p><strong>Localidad:</strong> {ubi.location?.name || 'Sin localidad'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
