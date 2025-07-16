import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EventoDetalle() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/event/${id}`)
      .then(res => setEvento(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!evento) return <p>Cargando...</p>;

  return (
    <div>
      <h2>{evento.nombre}</h2>
      <p>{evento.descripcion}</p>
      <p>Fecha: {evento.fecha}</p>
      <p>Precio: {evento.precio}</p>
      <p>Lugar: {evento.lugar}</p>
      {/* Acá podés agregar más detalles */}
    </div>
  );
}

export default EventoDetalle;
