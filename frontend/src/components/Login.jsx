import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/styles.css';

export default function Login() {
  const [datos, setDatos] = useState({ email: "", contraseña: "" });
  const [errores, setErrores] = useState({ email: false, contraseña: false });
  const [errorGeneral, setErrorGeneral] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const detectarCambios = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const validarEmail = (email) =>
    /^[a-z0-9]+@(gmail|hotmail|outlook)\.com$/.test(email);
  const validarContraseña = (pass) => pass.trim().length >= 4;

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setErrorGeneral("");
    setLoading(true);
    
    const validoEmail = validarEmail(datos.email);
    const validoContraseña = validarContraseña(datos.contraseña);
    setErrores({
      email: !validoEmail,
      contraseña: !validoContraseña,
    });

    if (!validoEmail || !validoContraseña) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/user/login', {
        username: datos.email,
        password: datos.contraseña,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate('/');
      } else {
        setErrorGeneral(res.data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      if (error.response) {
        setErrorGeneral(error.response.data.message || "Error en la autenticación");
      } else {
        setErrorGeneral("Error de conexión con el servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="section">
        <div className="container-sm">
          <div className="card">
            <div className="text-center mb-xl">
              <h1>Iniciar Sesión</h1>
              <p className="text-muted">Accede a tu cuenta para continuar</p>
            </div>

            {errorGeneral && (
              <div className="mb-lg p-md bg-red-50 rounded border border-red-200">
                <p className="text-red-600">{errorGeneral}</p>
              </div>
            )}

            <form onSubmit={enviarFormulario}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="tu@email.com"
                  value={datos.email}
                  onChange={detectarCambios}
                  required
                />
                {errores.email && (
                  <p className="text-red-600 text-sm mt-sm">Ingrese un correo electrónico válido.</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contraseña" className="form-label">Contraseña</label>
                <input
                  id="contraseña"
                  type="password"
                  name="contraseña"
                  className="form-input"
                  placeholder="Tu contraseña"
                  value={datos.contraseña}
                  onChange={detectarCambios}
                  required
                />
                {errores.contraseña && (
                  <p className="text-red-600 text-sm mt-sm">
                    La contraseña debe tener al menos 4 caracteres.
                  </p>
                )}
              </div>

              <div className="text-center">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-full"
                  disabled={loading}
                >
                  {loading ? "Iniciando sesión..." : "Ingresar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
