import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { modulos, usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [menuEstructurado, setMenuEstructurado] = useState({});
  const [isOpen, setIsOpen] = useState(false); // sidebar móvil
  const [moduloOpen, setModuloOpen] = useState({}); // estado por módulo
  const [menuOpen, setMenuOpen] = useState({}); // estado por menú

  useEffect(() => {
    const estructura = {};
    modulos.forEach((item) => {
      const modulo = item.modulo_nombre;
      const menu = item.menu_nombre;
      const opcion = { nombre: item.opcion_nombre, ruta: item.ruta };

      if (!estructura[modulo]) estructura[modulo] = {};
      if (!estructura[modulo][menu]) estructura[modulo][menu] = [];

      estructura[modulo][menu].push(opcion);
    });
    setMenuEstructurado(estructura);

    // Inicializar todos cerrados
    const modState = {};
    const menuState = {};
    Object.keys(estructura).forEach((modulo) => {
      modState[modulo] = true; // expandido por defecto
      Object.keys(estructura[modulo]).forEach((menu) => {
        menuState[`${modulo}-${menu}`] = true;
      });
    });
    setModuloOpen(modState);
    setMenuOpen(menuState);
  }, [modulos]);

  const toggleModulo = (modulo) => {
    setModuloOpen((prev) => ({ ...prev, [modulo]: !prev[modulo] }));
  };

  const toggleMenu = (modulo, menu) => {
    const key = `${modulo}-${menu}`;
    setMenuOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Toggle móvil */}
      <div className="md:hidden flex justify-between items-center bg-white border-b px-4 py-2 shadow">
        <h2 className="text-lg font-bold text-blue-800">SYRDIA ERP</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-blue-600 text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-white w-64 h-screen border-r flex-col justify-between p-4 shadow-md
          fixed z-40 top-0 left-0 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex`}
      >
        <div className="overflow-y-auto flex-grow">
          <h2 className="text-xl font-bold text-blue-800 mb-6 hidden md:block">SYRDIA ERP</h2>

          {Object.keys(menuEstructurado).length > 0 ? (
            Object.entries(menuEstructurado).map(([modulo, menus]) => (
              <div key={modulo} className="mb-4">
                <div
                  onClick={() => toggleModulo(modulo)}
                  className="cursor-pointer text-blue-600 font-semibold uppercase text-sm flex justify-between items-center mb-2"
                >
                  {modulo}
                  <span>{moduloOpen[modulo] ? '−' : '+'}</span>
                </div>
                {moduloOpen[modulo] &&
                  Object.entries(menus).map(([menu, opciones]) => (
                    <div key={menu} className="mb-2 ml-2">
                      <div
                        onClick={() => toggleMenu(modulo, menu)}
                        className="cursor-pointer text-xs text-gray-500 flex justify-between items-center"
                      >
                        {menu}
                        <span className="text-sm">
                          {menuOpen[`${modulo}-${menu}`] ? '−' : '+'}
                        </span>
                      </div>
                      {menuOpen[`${modulo}-${menu}`] && (
                        <ul className="ml-4">
                          {opciones.map((op) => (
                            <li key={op.ruta}>
                              <NavLink
                                to={op.ruta}
                                className={({ isActive }) =>
                                  `block py-1 text-sm ${
                                    isActive
                                      ? 'text-blue-700 font-bold'
                                      : 'text-gray-700 hover:text-blue-800'
                                  }`
                                }
                                onClick={() => setIsOpen(false)}
                              >
                                {op.nombre}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No tiene módulos asignados.</p>
          )}
        </div>

        {/* Pie: usuario y logout */}
        <div className="mt-4 border-t pt-4 text-sm text-gray-700">
          <p className="mb-1">👤 {usuario?.nombres}</p>
          <ul>
            <li>
              <NavLink
                to={`/usuarios/${usuario?.id}/password`}
                className="text-blue-600 hover:underline"
                onClick={() => setIsOpen(false)}
              >
                Cambiar contraseña
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline mt-2"
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
