import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Ventas from './pages/Ventas';
import Compras from './pages/Compras';
import Inventario from './pages/Inventario';
import RutaPrivada from './components/RutaPrivada';
import CambiarPassword from './pages/CambiarPassword';
import Usuarios from './pages/Usuarios';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <RutaPrivada>
            <Dashboard />
          </RutaPrivada>
        }
      />

      <Route
        path="/ventas"
        element={
          <RutaPrivada>
            <Ventas />
          </RutaPrivada>
        }
      />
      <Route
        path="/compras"
        element={
          <RutaPrivada>
            <Compras />
          </RutaPrivada>
        }
      />
      <Route
        path="/inventario"
        element={
          <RutaPrivada>
            <Inventario />
          </RutaPrivada>
        }
      />
      <Route path="/cambiar-password" element={<RutaPrivada> <CambiarPassword /> </RutaPrivada>} />

      <Route path="/usuarios" element={<RutaPrivada> <Usuarios /> </RutaPrivada>} />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
