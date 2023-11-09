import React, { useState, useEffect } from 'react';
import getLoginUsers from '../../api/login';
import Button from '../../components/button/button';
import InputComponent from '../../components/input/input';
import '../Login/login.scss';

const Login = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const getUsers = async () => {
    try {
      const getUsersData = await getLoginUsers();
      console.log(getUsersData.data);
      if (getUsersData) {
        setUserData(getUsersData.data);
      } else {
        setError('No se han recibido datos de usuarios.');
      }
    } catch (error) {
      console.log(error);
      setError('Hubo un error al cargar los datos de usuarios.');
    }
  };

  const handleLogin = () => {
    const foundUser = userData.some(
      (userValid) =>
        userValid.email === user && userValid.password === password,
    );
    const foundUserInfo = userData.find(
      (userValid) =>
        userValid.email === user && userValid.password === password,
    );
    if (user.length > 1 && password.length > 1) {
      if (foundUser) {
        localStorage.setItem(
          'userLogged',
          JSON.stringify(foundUserInfo),
        );
        /* localStorage.setItem('userLoggedPassword', password); */
        window.location.replace('/');
      } else {
        alert('please log in with vaild user and password');
      }
    } else {
      alert('please set user and password');
    }
    console.log(foundUser);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="login_parentContainer">
      <div className="login_mainContainer">
        <h1>Login</h1>
        <InputComponent
          forH="email"
          text="E-mail"
          id="email"
          name="email"
          value={user}
          stylying="login_input"
          changeEvent={(e) => setUser(e.target.value)}
        />
        <InputComponent
          forH="password"
          text="Password"
          id="password"
          name="password"
          value={password}
          stylying="login_input"
          changeEvent={(e) => setPassword(e.target.value)}
        />
        <Button
          text="Login"
          styling="login_button"
          onclick={handleLogin}
        />
      </div>
    </div>
  );
};

export default Login;
