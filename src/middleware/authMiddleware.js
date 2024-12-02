import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthMiddleware({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');
    if (!authToken) {
      navigate('/'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  return <>{children}</>; // Render children if authenticated
}

export default AuthMiddleware;
