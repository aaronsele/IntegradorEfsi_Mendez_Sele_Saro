import { useState } from 'react';
import axios from 'axios';

function BuscadorEventos({ onResultados }) {
  const [name, setName] = useState('');
  const [startdate, setStartdate] = useState('');
  const [tag, setTag] = useState('');

  const handleBuscar = async (e) => {
    e.preventDefault();

    try {
      const params = {};
      if (name) params.name = name;
      if (startdate) params.startdate = startdate;
      if (tag) params.tag = tag;

      const response = await axios.get('http://localhost:3001/api/event', { params });
      onResultados(response.data);
    } catch (error) {
      console.error('Error buscando eventos:', error);
      onResultados([]);
    }
  };

  return (
    <form onSubmit={handleBuscar}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="date"
        value={startdate}
        onChange={e => setStartdate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tag"
        value={tag}
        onChange={e => setTag(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}

export default BuscadorEventos;
