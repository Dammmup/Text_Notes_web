// src/components/Logout.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Удаляем токен из localStorage
    navigate('/login'); // Перенаправляем на страницу входа
  };

  return (
    <button onClick={handleLogout} style={{ padding: '10px', marginTop: '20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}>
      Logout
    </button>
  );
};

export default Logout;
