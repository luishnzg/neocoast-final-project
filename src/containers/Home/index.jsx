import React from 'react';

import login from '../../api/login';

import './index.scss';
import { useEffect } from 'react';
import { useState } from 'react';

const Home = () => {
  const [userActive, setUserActive] = useState();

  const initHome = async () => {
    const { data: userActive } = await login();
    console.log(userActive);
  };
  useEffect(() => {
    initHome();
  }, []);
  return (
    <div className="home">
      <h1>Welcome to the Home Page of the React Bootcamp App</h1>
    </div>
  );
};

export default Home;
