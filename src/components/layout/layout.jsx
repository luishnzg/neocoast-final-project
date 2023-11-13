import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import TopBar from 'Components/topbar/topbar';
import './layout.scss';

const Layout = () => (
  <div className="layout__parentContainer">
    <TopBar />
    <div>
      <Outlet />
    </div>
  </div>
);

export default Layout;
