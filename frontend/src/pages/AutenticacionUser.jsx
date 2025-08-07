import React, { useState } from "react";
import Login from "../components/Login";
import Registro from "../components/Registro";
import '../css/styles.css';

export default function AutenticacionUser() {
  const [modo, setModo] = useState("login");

  return (
    <div className="container">
      <div className="section">
        <div className="container-sm">
          <div className="text-center mb-2xl">
            <h1>Autenticación</h1>
            <p className="text-muted">Accede a tu cuenta o crea una nueva</p>
          </div>

          <div className="card">
            <div className="flex justify-center mb-xl">
              <div className="flex bg-gray-100 rounded-lg p-sm">
                {modo === "login" ? (
                  <button
                    onClick={() => setModo("registro")}
                    className="btn btn-ghost"
                  >
                    ¿No tienes cuenta? Registrate
                  </button>
                ) : (
                  <button
                    onClick={() => setModo("login")}
                    className="btn btn-ghost"
                  >
                    ¿Ya tienes cuenta? Inicia sesión
                  </button>
                )}
              </div>
            </div>
            {modo === "login" ? <Login /> : <Registro />}
          </div>
        </div>
      </div>
    </div>
  );
}
