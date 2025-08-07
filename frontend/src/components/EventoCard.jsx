import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventoCard = ({ evento }) => {
  const { name, description, start_date, duration_in_minutes, price, max_assistance, enabled_for_enrollment } = evento;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/eventos/${evento.id}`);
  };

  return (
    <div className="card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="card-header">
        <h3 className="card-title">{name}</h3>
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
        <p>{description}</p>
        <div className="flex gap-md mt-md flex-wrap items-center">
          <span className="badge badge-primary">{duration_in_minutes} minutes</span>
          <span className="badge badge-secondary">${price}</span>
          <span className="badge">{max_assistance} personas</span>
        </div>
        <p className="text-muted mt-md">
          Inscripción: {enabled_for_enrollment ? 
            <span className="text-primary">Disponible</span> : 
            <span className="text-secondary">No disponible</span>
          }
        </p>
      </div>
    </div>
  );
};

export default EventoCard;