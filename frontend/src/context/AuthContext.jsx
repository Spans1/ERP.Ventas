import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  // Corrección aquí: lectura única de localStorage
  const modulosGuardados = localStorage.getItem('modulos');
  const [modulos, setModulos] = useState(() =>
    modulosGuardados ? JSON.parse(modulosGuardados) : []
  );

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('usuario');
    const storedModulos = localStorage.getItem('modulos');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUsuario(JSON.parse(storedUser));
      if (storedModulos) {
        setModulos(JSON.parse(storedModulos));
      }
    }
  }, []);

  const login = async (token, usuario) => {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    setToken(token);
    setUsuario(usuario);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/${usuario.id}/menu`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setModulos(data.menu);
      localStorage.setItem('modulos', JSON.stringify(data.menu));
    } catch (err) {
      console.error('Error al obtener módulos:', err.message);
    }
  };

  const logout = () => {
    setUsuario(null);
    setToken(null);
    setModulos([]);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('modulos');
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        modulos,
        setUsuario,
        setToken,
        setModulos,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
