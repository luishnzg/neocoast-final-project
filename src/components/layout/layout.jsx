import React from 'react';
import { Outlet } from 'react-router-dom';

import TopBar from 'Components/topbar/topbar';
import './layout.scss';

const Layout = () => (
  <div className="layout__parentContainer">
    <TopBar />
    <div className="layout__outletContainer">
      <Outlet />
    </div>
  </div>
);

export default Layout;
