import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/styles.css';

export default function Registro() {
  const [datos, setDatos] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const [errores, setErrores] = useState({
    nombre: false,
    apellido: false,
    email: false,
    password: false,
  });

  const [errorGeneral, setErrorGeneral] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const detectarCambios = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const validarTexto = (text) => {
    const regexTexto = /^[A-Za-zÀ-ÿ\s]+$/;
    return text.trim().length > 0 && regexTexto.test(text);
  };
  const validarEmail = (email) => /^[a-z0-9]+@(gmail|hotmail|outlook)\.com$/.test(email);
  const validarpassword = (contra) => contra.trim().length >= 6;

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setErrorGeneral("");
    setSuccessMsg("");
    setLoading(true);

    const validoNombre = validarTexto(datos.nombre);
    const validoApellido = validarTexto(datos.apellido);
    const validoEmail = validarEmail(datos.email);
    const validopassword = validarpassword(datos.password);

    setErrores({
      nombre: !validoNombre,
      apellido: !validoApellido,
      email: !validoEmail,
      password: !validopassword,
    });

    if (!validoNombre || !validoApellido || !validoEmail || !validopassword) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/user/register', {
        first_name: datos.nombre,
        last_name: datos.apellido,
        username: datos.email,
        password: datos.password,
      });

      if (res.data.success) {
        setSuccessMsg("Usuario registrado correctamente. Redirigiendo...");
        setTimeout(() => navigate('http://localhost:3000/api/user/login'), 2000);
      } else {
        setErrorGeneral(res.data.message || "Error en el registro");
      }
    } catch (error) {
      if (error.response) {
        setErrorGeneral(error.response.data.error || "Error en el registro");
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
              <h1>Registro</h1>
              <p className="text-muted">Crea tu cuenta para comenzar</p>
            </div>

            {errorGeneral && (
              <div className="mb-lg p-md bg-red-50 rounded border border-red-200">
                <p className="text-red-600">{errorGeneral}</p>
              </div>
            )}
            
            {successMsg && (
              <div className="mb-lg p-md bg-green-50 rounded border border-green-200">
                <p className="text-green-600">{successMsg}</p>
              </div>
            )}

            <form onSubmit={enviarFormulario}>
              <div className="grid grid-cols-2 gap-lg">
                <div className="form-group">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    className="form-input"
                    placeholder="Tu nombre"
                    value={datos.nombre}
                    onChange={detectarCambios}
                    required
                  />
                  {errores.nombre && (
                    <p className="text-red-600 text-sm mt-sm">Ingrese un nombre válido.</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="apellido" className="form-label">Apellido</label>
                  <input
                    id="apellido"
                    type="text"
                    name="apellido"
                    className="form-input"
                    placeholder="Tu apellido"
                    value={datos.apellido}
                    onChange={detectarCambios}
                    required
                  />
                  {errores.apellido && (
                    <p className="text-red-600 text-sm mt-sm">Ingrese un apellido válido.</p>
                  )}
                </div>
              </div>

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
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Tu contraseña"
                  value={datos.password}
                  onChange={detectarCambios}
                  required
                />
                {errores.password && (
                  <p className="text-red-600 text-sm mt-sm">La contraseña debe tener al menos 6 caracteres.</p>
                )}
              </div>

              <div className="text-center">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-full"
                  disabled={loading}
                >
                  {loading ? "Registrando..." : "Registrarme"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
