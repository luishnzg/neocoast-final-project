import React, { useEffect, useState } from 'react';

import Button from 'Components/button/button';
import { Link, NavLink } from 'react-router-dom';
import './topbar.scss';

const TopBar = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const [displayLoggedView, setDisplayLoggedView] = useState('');
  const isUserLogged = () => {
    setLoggedUser(JSON.parse(localStorage.getItem('userLogged')));
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
            <NavLink
              to="/giftcart"
              className={({ isActive, isPending }) =>
                isPending ? 'pending' : isActive ? 'active' : ''
              }>
              Send Gift
            </NavLink>
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

              <NavLink
                to={`/usercart/${loggedUser.id}/0`}
                className={({ isActive, isPending }) =>
                  isPending ? 'pending' : isActive ? 'active' : ''
                }>
                Cart
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
