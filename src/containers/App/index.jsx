import React from 'react';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { ROUTES } from 'Data/constants';
import Layout from 'Components/layout/layout';
import Home from 'Containers/Home';

import './index.scss';
import Login from 'Containers/Login/login';
import Profile from 'Containers/profile/profile';
import Product from 'Containers/product/product';
import Cart from 'Containers/cart/cart';
import GiftCart from 'Containers/giftcart/giftCart';

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
