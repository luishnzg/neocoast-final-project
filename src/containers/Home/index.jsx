import React from 'react';

import login from '../../api/login';

import './index.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import ProductList from 'Components/productList/productList';
import CategoryMenu from 'Components/categories/categories';

const Home = () => {
  const [userActive, setUserActive] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const initHome = async () => {
    const { data: userActive } = await login();
    console.log(userActive);
  };
  useEffect(() => {
    initHome();
  }, []);
  return (
    <div className="home">
      <CategoryMenu
        onSelectCategory={(category) => setSelectedCategory(category)}
      />
      <ProductList selectedCategory={selectedCategory} />
    </div>
  );
};

export default Home;
