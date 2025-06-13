// src/services/tokenService.js

const apiUrl = import.meta.env.VITE_API_URL;
const user_api = import.meta.env.VITE_API_USER;
const pass_api = import.meta.env.VITE_API_PASS;

export const obtenerTokenTecnico = async () => {
  try {
    const res = await fetch(`${apiUrl}/auth/generatoken`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user_api,
        password: pass_api
      })
    });

    const data = await res.json();
    if (!res.ok || !data.token) {
      throw new Error(data.msg || 'Error al generar token técnico');
    }

    return data.token;
  } catch (err) {
    console.error('Error al obtener token técnico:', err.message);
    throw err;
  }
};
