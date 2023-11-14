import React, { useEffect, useState } from 'react';

import Button from 'Components/button/button';
import { Link } from 'react-router-dom';
import './topbar.scss';
import { isUserLogged } from '../../utils/userLogged';

const TopBar = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const settingUserID = () => {
    setLoggedUser(JSON.parse(localStorage.getItem('userLogged')));
  };
  /* const [displayLoggedView, setDisplayLoggedView] = useState(''); */
  /*  const isUserLogged = () => {
    setLoggedUser(JSON.parse(localStorage.getItem('userLogged')));
    if (!(loggedUser === null)) {
      setDisplayLoggedView(true);
    } else {
      setDisplayLoggedView(false);
    }
  }; */
  const displayLoggedView = isUserLogged();
  const handleLogOut = () => {
    localStorage.clear();
    setLoggedUser(null);
    window.location.reload();
  };
  const handleLogIn = () => {
    window.location.replace('/login');
  };
  useEffect(() => {
    settingUserID();
  }, [displayLoggedView]);
  return (
    <header>
      <nav className="topBar__nav">
        <div className="topBar__navBlockImage">
          <img
            className="top-bar__image"
            src="https://i.ibb.co/BLNm7hr/001-bag.png"
            alt="shoppinIcon"
          />
          <Link className="topBar__link" to="/">
            Neo<span>Store</span>
          </Link>
        </div>
        {displayLoggedView ? (
          <div className="topBar__navBlocks">
            <Link to="/giftcart" className="topBar__linkNav">
              Send Gift
            </Link>
            <Link
              to={`/usercart/${loggedUser && loggedUser.id}/0`}
              className="topBar__linkNav">
              Cart
            </Link>

            <Link to="/profile" className="topBar__linkNav">
              Profile
            </Link>

            <Button
              text="Log Out"
              styling="logout__button"
              onclick={handleLogOut}
            />
          </div>
        ) : (
          <div className="topBar__logoutContainer">
            <Button
              text="Log In"
              styling="login__button"
              onclick={handleLogIn}
            />
          </div>
        )}
      </nav>
    </header>
  );
};

export default TopBar;
