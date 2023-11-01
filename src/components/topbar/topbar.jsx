import React from 'react';
/* import { NavLink } from 'react-router-dom'; */

const TopBar = () => (
  <header>
    <nav className="top-bar__nav">
      <ul>
        <li>Login</li>
      </ul>
    </nav>
  </header>
  /*   <header className="top-bar">
    <div className="top-bar__logo">
      {typeof logo === 'string' ? (
        <img src={logo} alt="Logo" />
      ) : (
        logo
      )}
    </div>
    <nav className="top-bar__nav">
      <ul>
        {routes.map(({ label, route }) => (
          <li key={label}>
            <NavLink
              to={route}
              className={({ isActive }) =>
                isActive && 'top-bar__active'
              }>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </header> */
);

export default TopBar;
