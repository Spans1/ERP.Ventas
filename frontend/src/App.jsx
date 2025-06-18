import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Ventas from './pages/Ventas';
import Compras from './pages/Compras';
import Inventario from './pages/Inventario';
import RutaPrivada from './components/RutaPrivada';
import CambiarPassword from './pages/CambiarPassword';
import Usuarios from './pages/Usuarios';
import UsuarioForm from './pages/UsuarioForm';

// 🔁 Importa correctamente los componentes de mantenimiento
import Sucursales from './pages/Sucursal';
import SucursalForm from './pages/SucursalForm';

import Roles from './pages/Roles';
import RolForm from './pages/RolForm';

function App() {
  return (
    <Routes>
      {/* Redirección a login */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas */}
      <Route path="/dashboard" element={<RutaPrivada><Dashboard /></RutaPrivada>} />
      <Route path="/ventas" element={<RutaPrivada><Ventas /></RutaPrivada>} />
      <Route path="/compras" element={<RutaPrivada><Compras /></RutaPrivada>} />
      <Route path="/inventario" element={<RutaPrivada><Inventario /></RutaPrivada>} />
      <Route path="/cambiar-password" element={<RutaPrivada><CambiarPassword /></RutaPrivada>} />
      <Route path="/usuarios/:id/password" element={<RutaPrivada><CambiarPassword /></RutaPrivada>} />

      <Route path="/maestros/usuarios" element={<RutaPrivada><Usuarios /></RutaPrivada>} />
      <Route path="/maestros/usuarios/nuevo" element={<RutaPrivada><UsuarioForm /></RutaPrivada>} />
      <Route path="/maestros/usuarios/:id/editar" element={<RutaPrivada><UsuarioForm /></RutaPrivada>} />

      {/* Módulo Sucursales */}
      <Route path="/maestros/sucursales" element={<RutaPrivada><Sucursales /></RutaPrivada>} />
      <Route path="/maestros/sucursales/nuevo" element={<RutaPrivada><SucursalForm /></RutaPrivada>} />
      <Route path="/maestros/sucursales/:id/editar" element={<RutaPrivada><SucursalForm /></RutaPrivada>} />

      {/* Módulo Roles */}
      <Route path="/maestros/roles" element={<RutaPrivada><Roles /></RutaPrivada>} />
      <Route path="/maestros/roles/nuevo" element={<RutaPrivada><RolForm /></RutaPrivada>} />
      <Route path="/maestros/roles/:id/editar" element={<RutaPrivada><RolForm /></RutaPrivada>} />

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
