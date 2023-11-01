import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import TopBar from 'Components/topbar/topbar';

import './styles.scss';

const Layout = () => (
  <div>
    <TopBar />
    <div>
      <Outlet />
    </div>
  </div>
);

export default Layout;
