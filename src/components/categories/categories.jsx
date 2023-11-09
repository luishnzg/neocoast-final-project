import React from 'react';
import { useState, useEffect } from 'react';

import getCategory from '../../api/category';
import '../categories/categories.scss';

const CategoryMenu = ({ onSelectCategory }) => {
  const [categoryData, setCategoryData] = useState(null);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (category) => {
    onSelectCategory(category === 'All' ? null : category);
    setActiveCategory(category);
  };
  const getCategoryList = async () => {
    try {
      const getCategoryData = await getCategory();
      console.log(getCategoryData.data);
      if (getCategoryData) {
        setCategoryData(getCategoryData.data);
      } else {
        setError('No se han recibido datos de las categorias.');
      }
    } catch (error) {
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
        <div
          className={`categoryList__listItem ${
            activeCategory === 'All' ? 'active' : ''
          }`}
          onClick={() => handleCategoryClick('All')}>
          All
        </div>
        {categoryData ? (
          categoryData.map((category, index) => (
            <div
              key={index}
              className={`categoryList__listItem ${
                activeCategory === category ? 'active' : ''
              }`}
              onClick={() => handleCategoryClick(category)}>
              {category}
            </div>
          ))
        ) : (
          <div>
            <h1>Es una Prueba</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryMenu;
