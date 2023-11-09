import React, { useEffect, useState } from 'react';

import '../topbar/topbar.scss';
import Button from 'Components/button/button';
import { Link, NavLink } from 'react-router-dom';

const TopBar = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const [displayLoggedView, setDisplayLoggedView] = useState('');
  const isUserLogged = () => {
    setLoggedUser(localStorage.getItem('userLogged'));
    if (!(loggedUser === null)) {
      setDisplayLoggedView(true);
    } else {
      setDisplayLoggedView(false);
    }
  };
  const handleLogOut = () => {
    localStorage.clear();
    setLoggedUser(null);
  };
  const handleLogIn = () => {
    window.location.replace('/login');
  };
  useEffect(() => {
    isUserLogged();
  }, [loggedUser, displayLoggedView]);
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
            <p>Send Gift</p>
            <img
              className="top-bar__image"
              src="https://i.ibb.co/GtL7Tvt/food-cart.png"
              alt="cart"
            />
            <div>
              <NavLink
                to="/profile"
                className={({ isActive, isPending }) =>
                  isPending ? 'pending' : isActive ? 'active' : ''
                }>
                User Profile
              </NavLink>
            </div>
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
