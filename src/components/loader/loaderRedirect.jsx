import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './loader.scss';

const LoaderWithRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      alert('There has been an error while updating the page');
      navigate('/');
    }, 15000); // 15 segundos

    return () => clearTimeout(timeout);
  }, [navigate]);

  return <div className="loaderRedirect"></div>;
};

export default LoaderWithRedirect;
