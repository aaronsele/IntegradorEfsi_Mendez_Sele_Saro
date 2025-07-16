import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventosList from "./pages/EventosList";
import EventoDetalle from "./pages/EventoDetalle";
import Form from "./pages/Form";
import MisEventos from "./pages/MisEventos";
import UbicacionesList from "./pages/UbicacionesList";
import Layout from './Layout/LayoutPage';

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
        <Route path="eventos" element={<EventosList />} />
        <Route path="eventos/:id" element={<EventoDetalle />} />
        <Route path="crear-evento" element={<PrivateRoute><Form/></PrivateRoute>} />
        <Route path="mis-eventos" element={<PrivateRoute><MisEventos /></PrivateRoute>} />
        <Route path="ubicaciones" element={<PrivateRoute><UbicacionesList /></PrivateRoute>} />
        <Route path="*" element={<h1>404 😢</h1>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
