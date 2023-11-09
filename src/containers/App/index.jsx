import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { ROUTES } from 'Data/constants';
import Layout from '../../components/layout/layout.jsx';
import Home from 'Containers/Home';

import './index.scss';
import Login from '../../containers/Login/login.jsx';
import Profile from 'Containers/profile/profile.jsx';
import Product from 'Components/product/product.jsx';

/* const BrowserRouter = createBrowserRouter([
  {
    element: <Home />,
    path: ROUTES.home,
  },
]); */

/* const App = () => (<RouterProvider router={BrowserRouter} />);
 */
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.home} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.profile} element={<Profile />} />
        <Route path="/product/:id" element={<Product />} />
        {/* <Route path={ROUTES.movie} element={<MovieView />} />
        <Route path={ROUTES.favorites} element={<Favorites />} />
        <Route path="*" element={<ErrorPage />} /> */}
      </Route>
      <Route path={ROUTES.login} element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;
