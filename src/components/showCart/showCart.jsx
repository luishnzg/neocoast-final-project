import React from 'react';

import './showCart.scss';

const ShowCart = ({
  image,
  price,
  title,
  quantityP,
  total,
  handler,
}) => (
  <div className="cartProduct__container">
    <div className="cartProduct__imageContainer">
      <img
        className="cartProduct__image"
        src={image}
        alt="productImage"
      />
    </div>
    <div className="cartProduct__infoContainer">
      <div className="cartProduct__titleContainer">{title}</div>
      <div className="cartProduct__priceContainer">
        <p>Quantity {quantityP}</p>
        <p>Unit USD {price}</p>
        <p>Total USD {total}</p>
      </div>
    </div>
  </div>
);

export default ShowCart;
