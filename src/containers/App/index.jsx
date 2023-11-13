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
import Product from 'Containers/product/product.jsx';
import Cart from 'Containers/cart/cart.jsx';
import GiftCart from 'Containers/giftcart/giftCart.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.home} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.profile} element={<Profile />} />
        <Route path={ROUTES.product} element={<Product />} />
        <Route path={ROUTES.otherUserCart} element={<Cart />} />
        <Route path={ROUTES.userCart} element={<Cart />} />
        <Route path={ROUTES.giftcart} element={<GiftCart />} />
        {/* <Route path={ROUTES.movie} element={<MovieView />} />
        <Route path={ROUTES.favorites} element={<Favorites />} />
        <Route path="*" element={<ErrorPage />} /> */}
      </Route>
      <Route path={ROUTES.login} element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;
