import { useState, useEffect } from 'react';
import axios from 'axios';
import EventoCard from '../components/EventoCard';
import './EventosList.css';

function EventosList() {
  const [eventos, setEventos] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/event?page=${page}&limit=10`)
      .then(res => setEventos(res.data))
      .catch(err => console.error(err));
  }, [page]);

  return (
    <div>
      <h2>Eventos</h2>
      {eventos.length === 0 && <p>No hay eventos para mostrar</p>}
      {eventos.map(e => <EventoCard key={e.id} evento={e} />)}

      <button onClick={() => setPage(p => Math.max(p - 1, 1))}>Anterior</button>
      <button onClick={() => setPage(p => p + 1)}>Siguiente</button>
    </div>
  );
}

export default EventosList;
