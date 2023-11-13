import React from 'react';

import './index.scss';

import { useState } from 'react';
import ProductList from 'Components/productList/productList';
import CategoryMenu from 'Components/categories/categories';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

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
