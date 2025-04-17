// src/utils/auth.js

export const isAuthenticated = () => {
    const token = localStorage.getItem('access_token');
    return !!token; // devuelve true si hay token, false si no
  };
  
  export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role'); // si estás guardando el rol
  };
  