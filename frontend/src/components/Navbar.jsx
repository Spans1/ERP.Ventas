import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-700 text-white flex justify-between items-center px-6 py-3 shadow">
      <h1 className="text-xl font-bold">SYRDIA ERP</h1>
      <div className="flex items-center space-x-4">
        <span className="text-sm">Hola, <strong>{usuario?.nombres || 'Usuario'}</strong></span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-sm px-3 py-1 rounded"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Navbar;
