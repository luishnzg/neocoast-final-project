import React, { useEffect } from 'react';
import { useState } from 'react';
import './productList.scss';
import { Link } from 'react-router-dom';
import Loader from 'Components/loader/loader';
import getProducts from '../../api/products';

const ProductList = ({ selectedCategory }) => {
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);

  const filteredProducts = selectedCategory
    ? productData.filter(
        (product) => product.category === selectedCategory,
      )
    : productData;

  const getProductsList = async () => {
    try {
      const getProductData = await getProducts();
      console.log(getProductData.data);
      if (getProductData) {
        setProductData(getProductData.data);
      } else {
        setError('No se han recibido datos de los productos.');
      }
    } catch (errorApi) {
      console.log(error);
      setError('Hubo un error al cargar los datos de los productos.');
    }
  };
  useEffect(() => {
    getProductsList();
  }, []);
  return (
    <div className="parentContainer">
      <div className="productList__listContainer">
        {productData &&
          filteredProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="productList__listItem">
              <div className="productList__imageContainer">
                <img
                  className="productList__image"
                  src={product.image}
                  alt="productImage"
                />
              </div>
              <div className="productList__listItemTitle">
                <p className="productList__title">{product.title} </p>
              </div>
              <div className="productList__listItemPrice">
                <p className="productList__title">
                  <span>USD {product.price}</span>
                </p>
              </div>
            </Link>
          ))}
      </div>
      {!productData && (
        <div className="loaderParentContainer">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default ProductList;
