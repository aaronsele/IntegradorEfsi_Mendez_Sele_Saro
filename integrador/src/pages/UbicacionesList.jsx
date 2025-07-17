import { useEffect, useState } from 'react';
import axios from 'axios';
import './UbicacionesList.css';

function UbicacionesList() {
  const [ubicaciones, setUbicaciones] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/event-location', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setUbicaciones(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Mis Ubicaciones</h2>
      {ubicaciones.length === 0 && <p>No tenés ubicaciones cargadas.</p>}
      <ul>
        {ubicaciones.map(u => (
          <li key={u.id}>{u.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default UbicacionesList;
