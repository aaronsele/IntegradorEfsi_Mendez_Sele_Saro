import { Link, Outlet, useNavigate } from 'react-router-dom';

function LayoutPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/eventos" style={{ marginRight: '1rem' }}>Eventos</Link>
        {isLoggedIn && (
          <>
            <Link to="/crear-evento" style={{ marginRight: '1rem' }}>Crear Evento</Link>
            <Link to="/mis-eventos" style={{ marginRight: '1rem' }}>Mis Eventos</Link>
            <Link to="/ubicaciones" style={{ marginRight: '1rem' }}>Ubicaciones</Link>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
      </nav>

      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </>
  );
}

export default LayoutPage;
