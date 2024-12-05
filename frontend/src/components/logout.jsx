import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import { notification, Spin } from 'antd';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    notification.success({
      message: 'Successfully logged out',
      description: 'You have logged out successfully.',
    });
    navigate('/');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleLogout();
    }, 1500); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-yellow-100">
      <div className="text-center">
        {loading ? (
          <>
            <Spin size="large" className="mb-4" />
            <h2>Logging you out...</h2>
          </>
        ) : (
          <h1>You have been logged out!</h1>
        )}
      </div>
    </div>
  );
};

export default Logout;
