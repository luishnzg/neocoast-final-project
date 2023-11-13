import React from 'react';
import { useState, useEffect } from 'react';

import Button from 'Components/button/button';
import Loader from 'Components/loader/loader';
import getCategory from '../../api/category';
import './categories.scss';

const CategoryMenu = ({ onSelectCategory }) => {
  const [categoryData, setCategoryData] = useState(null);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const handleCategoryClick = (category) => {
    onSelectCategory(category === 'All' ? null : category);
    setActiveCategory(category);
  };
  useEffect(() => {}, [activeCategory]);
  const getCategoryList = async () => {
    try {
      const getCategoryData = await getCategory();
      console.log(getCategoryData.data);
      if (getCategoryData) {
        setCategoryData(getCategoryData.data);
      } else {
        setError('No se han recibido datos de las categorias.');
      }
    } catch (errorApi) {
      console.log(error);
      setError(
        'Hubo un error al cargar los datos de las categorias.',
      );
    }
  };
  useEffect(() => {
    getCategoryList();
  }, []);
  return (
    <div className="category__parentContainer">
      <div className="categoryList__listContainer">
        {categoryData && (
          <Button
            styling={`categoryList__listItem ${
              activeCategory === 'All' ? 'active' : ''
            }`}
            onclick={() => handleCategoryClick('All')}
            text="All"
          />
        )}
        {categoryData &&
          categoryData.map((category, index) => (
            <Button
              key={index}
              styling={`categoryList__listItem ${
                activeCategory === category ? 'active' : ''
              }`}
              onclick={() => handleCategoryClick(category)}
              text={category}
            />
          ))}
        {!categoryData && (
          <div>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryMenu;
