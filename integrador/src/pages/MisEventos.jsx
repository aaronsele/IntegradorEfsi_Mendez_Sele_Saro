import { useEffect, useState } from 'react';
import axios from 'axios';

function MisEventos() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/event', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        // Suponiendo que la API devuelve todos los eventos y filtrás los tuyos
        const misEventos = res.data.filter(e => e.creador === "usuario"); // Ajustá según el campo correcto
        setEventos(misEventos);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Mis Eventos</h2>
      {eventos.length === 0 && <p>No creaste ningún evento todavía.</p>}
      {eventos.map(e => (
        <div key={e.id}>
          <h3>{e.nombre}</h3>
          {/* Botones editar y eliminar pueden ir acá */}
        </div>
      ))}
    </div>
  );
}

export default MisEventos;
