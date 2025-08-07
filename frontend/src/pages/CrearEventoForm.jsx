import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CrearEventoForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    duracion: "",
    precio: "",
    max_assistance: "",
    enabled_for_enrollment: true,
    id_event_location: "",
  });

  const [ubicaciones, setUbicaciones] = useState([]);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/event-location", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUbicaciones(res.data);
      } catch (err) {
        console.error("Error cargando ubicaciones", err);
      }
    };
    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (
      !formData.nombre ||
      !formData.fecha ||
      !formData.duracion ||
      !formData.precio ||
      !formData.id_event_location
    ) {
      setError("Por favor completá todos los campos obligatorios");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.id;

      const body = {
        name: formData.nombre,
        description: formData.descripcion,
        start_date: formData.fecha,
        duration_in_minutes: parseInt(formData.duracion, 10),
        price: parseFloat(formData.precio),
        enabled_for_enrollment: formData.enabled_for_enrollment,
        max_assistance:
          formData.max_assistance !== ""
            ? parseInt(formData.max_assistance, 10)
            : null,
        id_event_location: parseInt(formData.id_event_location, 10),
        creator_user: userId
      };

      const res = await axios.post('http://localhost:3000/api/event', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        setMensaje("Evento creado con éxito");
        setFormData({
          nombre: "",
          descripcion: "",
          fecha: "",
          duracion: "",
          precio: "",
          max_assistance: "",
          enabled_for_enrollment: true,
          id_event_location: "",
        });
      }
    } catch (error) {
      setError(error.response?.data?.error || "Error al crear el evento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div style={{
        width: '100%',
        height: '220px',
        backgroundImage: 'url(https://media.c5n.com/p/a645f8e43d84068723caba1fe0e042d6/adjuntos/326/imagenes/000/288/0000288606/790x0/smart/4b96be81c6e9a408ca62ba5f696298f8345b6fdcjpg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '18px',
        marginBottom: '2rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.15)'
      }} />
      <div className="section">
        <div className="text-center mb-2xl">
          <h1>Crear Nuevo Evento</h1>
          <p className="text-muted">Completa los datos para crear un evento increíble</p>
        </div>

        <div className="container-md">
          <div className="card">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-lg">
                <div className="form-group">
                  <label htmlFor="nombre" className="form-label">Nombre del Evento *</label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    className="form-input"
                    placeholder="Nombre del evento"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fecha" className="form-label">Fecha y Hora *</label>
                  <input
                    id="fecha"
                    type="datetime-local"
                    name="fecha"
                    className="form-input"
                    value={formData.fecha}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="descripcion" className="form-label">Descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  className="form-textarea"
                  placeholder="Describe tu evento..."
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

              <div className="grid grid-cols-3 gap-lg">
                <div className="form-group">
                  <label htmlFor="duracion" className="form-label">Duración (minutos) *</label>
                  <input
                    id="duracion"
                    type="number"
                    name="duracion"
                    className="form-input"
                    placeholder="120"
                    value={formData.duracion}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="precio" className="form-label">Precio *</label>
                  <input
                    id="precio"
                    type="number"
                    name="precio"
                    className="form-input"
                    placeholder="0.00"
                    step="0.01"
                    value={formData.precio}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="max_assistance" className="form-label">Capacidad Máxima</label>
                  <input
                    id="max_assistance"
                    type="number"
                    name="max_assistance"
                    className="form-input"
                    placeholder="100"
                    value={formData.max_assistance}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="id_event_location" className="form-label">Ubicación *</label>
                <select
                  id="id_event_location"
                  name="id_event_location"
                  className="form-select"
                  value={formData.id_event_location}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccioná una ubicación</option>
                  {ubicaciones.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} - {loc.full_address}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="flex items-center gap-sm">
                  <input
                    type="checkbox"
                    name="enabled_for_enrollment"
                    checked={formData.enabled_for_enrollment}
                    onChange={handleChange}
                    className="rounded"
                  />
                  <span>Habilitado para inscripción</span>
                </label>
              </div>

              <div className="text-center">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg" 
                  disabled={loading}
                >
                  {loading ? "Creando..." : "Crear Evento"}
                </button>
              </div>

              {error && (
                <div className="mt-lg p-md bg-red-50 rounded border border-red-200">
                  <p className="text-red-600">{error}</p>
                </div>
              )}
              
              {mensaje && (
                <div className="mt-lg p-md bg-green-50 rounded border border-green-200">
                  <p className="text-green-600">{mensaje}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
