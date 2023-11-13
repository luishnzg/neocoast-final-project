import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowCart from 'Components/showCart/showCart';

import './cart.scss';
import Button from 'Components/button/button';
import LoaderWithRedirect from 'Components/loader/loaderRedirect';
import getUserCart from '../../api/userCart';

const Cart = () => {
  const { id } = useParams();
  const { cartid } = useParams();
  const [cartDetail, setCartDetail] = useState([]);
  const [productList, setProductList] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const [error, setError] = useState();
  const [productQuantity, setProductQuantity] = useState([]);

  const getCartActiveUser = async (userId, cartId) => {
    try {
      const getUserCartData = await getUserCart(userId);
      if (getUserCartData) {
        setCartDetail(getUserCartData);
        setProductQuantity(getUserCartData.data[cartId].products);
        const cart = getUserCartData.data[cartId].products.map(
          (product) =>
            fetch(
              `https://fakestoreapi.com/products/${product.productId}`,
            ).then((res) => res.json()),
        );
        setErrorState(false);
        Promise.all(cart).then((data) => {
          setProductList(data);
          setErrorState(false);
          console.log('el carrito con fetch', cart);
        });
      } else {
        setError('No se han recibido datos del carrito del usuario.');
        setErrorState(false);
      }
    } catch (error) {
      console.log(error);
      setErrorState(true);
    }
  };
  const getGiftCartUser = async (userId, cartId) => {
    try {
      const getUserCartData = await getUserCart(userId);
      console.log(
        'imprimido desde el getgiftcaruser, es el gifcartuserdata',
        getUserCartData.data,
      );
      if (getUserCartData.data) {
        console.log('lo encontro bien');
        const foundOtherUserCart = getUserCartData.data.find(
          (cart) => cart.id === cartId || 'no se encontro',
        );
        setCartDetail(foundOtherUserCart);
        setProductQuantity(foundOtherUserCart.products);
        const cart = foundOtherUserCart.products.map((product) =>
          fetch(
            `https://fakestoreapi.com/products/${product.productId}`,
          ).then((res) => res.json()),
        );
        setErrorState(false);
        Promise.all(cart).then((data) => {
          setProductList(data);
          setErrorState(false);
          console.log('el carrito con fetch', cart);
        });
      } else {
        setError('No se han recibido datos del carrito del usuario.');
        setErrorState(false);
      }
    } catch (error) {
      setErrorState(true);
    }
  };
  const handleCartPurchase = () => {
    alert('Purchase completed');
    window.location.replace('/');
  };

  useEffect(() => {
    let params = new URL(document.location).searchParams;
    if (params.has('usercart')) {
      getCartActiveUser(id, cartid);
    } else {
      getGiftCartUser(id, cartid);
    }
  }, [id, errorState, cartid]);

  return (
    <div className="cart__parentContainer">
      {productList.length > 0 ? (
        <div className="cart__mainContainer">
          {productList.map((product) => {
            const quantityProduct =
              productQuantity.find(
                (qp) => qp.productId === product.id,
              ) || {};
            const quantityP = quantityProduct.quantity || 0;
            const total = quantityP * product.price;

            return (
              <ShowCart
                image={product.image}
                price={product.price}
                title={product.title}
                quantityP={quantityP}
                total={total}
                key={product.id}
              />
            );
          })}
          {console.log('este es cartdetail', cartDetail)}
          <Button
            styling="cart__purchaseButton"
            text="Purchase"
            onclick={handleCartPurchase}
          />
        </div>
      ) : cartDetail.status ? (
        <div className="cart__mainContainer">
          <h1>Cart is not created</h1>
        </div>
      ) : (
        <div className="loaderContainer">
          <LoaderWithRedirect />
        </div>
      )}
    </div>
  );
};

export default Cart;
