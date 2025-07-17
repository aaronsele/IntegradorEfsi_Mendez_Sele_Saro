import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function Form() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [precio, setPrecio] = useState('');
  const [lugar, setLugar] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/api/event', {
        nombre, descripcion, fecha, precio: Number(precio), lugar
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      navigate('/mis-eventos');
    } catch (error) {
      console.error(error);
      alert('Error al crear el evento');
    }
  };

  return (
    <div>
      <h2>Crear Evento</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <input placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
        <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} required />
        <input type="number" placeholder="Precio" value={precio} onChange={e => setPrecio(e.target.value)} required />
        <input placeholder="Lugar" value={lugar} onChange={e => setLugar(e.target.value)} required />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

export default Form;
