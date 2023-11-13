import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getProductDetail from '../../api/productDetail';

import './product.scss';
import Loader from 'Components/loader/loader';

const Product = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [error, setError] = useState(null);

  const handleGoBack = () => {
    window.history.back();
  };
  const getProduct = async (productId) => {
    try {
      const getProductDataDetail = await getProductDetail(productId);
      console.log(getProductDataDetail.data);
      if (getProductDataDetail) {
        setProductDetail(getProductDataDetail.data);
      } else {
        setError('No se han recibido datos de los productos.');
      }
    } catch (error) {
      console.log(error);
      setError('Hubo un error al cargar los datos de los productos.');
    }
  };
  useEffect(() => {
    getProduct(id);
  }, [id]);
  return (
    <div className="productDetail__parentContainer">
      <div className="productDetail__mainContainer">
        <button
          className="productDetail__backButton"
          type="button"
          onClick={handleGoBack}>
          {`< `}Back
        </button>
        {productDetail ? (
          <div className="productDetail__productContainer">
            <div className="productDetail__imageContainer">
              <img
                className="productDetail__image"
                src={productDetail.image}
                alt="productImage"
              />
            </div>
            <div className="productDetail__infoContainer">
              <div className="productDetail__titleContainer">
                <p>{productDetail.title}</p>
              </div>
              <div className="productDetail__categoryRatingContainer">
                <p className="productDetail__category">
                  {productDetail.category}
                </p>
                <div className="productDetail__ratingStar">
                  <img
                    className="productDetail__start"
                    src="https://i.ibb.co/pfG9jBp/star.png"
                    alt="imageStar"
                  />
                  <p className="productDetail__rate">
                    {productDetail.rating.rate}
                    {' ('}
                    {productDetail.rating.count} Ratings {' )'}
                  </p>
                </div>
              </div>
              <div className="productDetail__descriptionPrice">
                <p className="productDetail__description">
                  {productDetail.description}
                </p>
                <p className="productDetail__price">
                  USD {productDetail.price}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="loaderContainer">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
