import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowCart from 'Components/showCart/showCart';

import './cart.scss';
import Button from 'Components/button/button';
import LoaderWithRedirect from 'Components/loader/loaderRedirect';
import getUserCart from '../../api/userCart';
import { isUserLogged } from '../../utils/userLogged';

const Cart = () => {
  const { id } = useParams();
  const { cartid } = useParams();
  const [cartDetail, setCartDetail] = useState([]);
  const [productList, setProductList] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const [error, setError] = useState();
  const [productQuantity, setProductQuantity] = useState([]);
  const [userIdLogged, setUserIdLogged] = useState();
  const displayLoggedView = isUserLogged();
  const settingUserID = () => {
    setUserIdLogged(
      JSON.parse(localStorage.getItem('userLogged')).id.toString(),
    );
    if (userIdLogged === null) {
      window.location.replace('/');
    }
  };
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
        });
      } else {
        setError('Cart data has not been received');
        setErrorState(false);
      }
    } catch (errorApi) {
      console.log(error);
      setErrorState(true);
      alert(
        'There has been an error while trying to retrieve the cart data',
      );
    }
  };
  const getGiftCartUser = async (userId, cartId) => {
    try {
      const getUserCartData = await getUserCart(userId);
      if (getUserCartData.data) {
        const foundOtherUserCart = getUserCartData.data.find(
          (cart) => cart.id === cartId || 'not found',
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
        });
      } else {
        setError('Cart data has not been retrieved');
        setErrorState(false);
      }
    } catch (errorApi) {
      setErrorState(true);
      alert('Cart data has not been retrieved');
      window.location.replace('/');
    }
  };
  const handleCartPurchase = () => {
    alert('Purchase completed');
    window.location.replace('/');
  };

  useEffect(() => {
    const params = new URL(document.location).searchParams;
    if (params.has('usercart')) {
      getCartActiveUser(id, cartid);
    } else {
      getGiftCartUser(id, cartid);
    }
    settingUserID();
  }, [id, errorState, cartid, displayLoggedView, userIdLogged]);

  return (
    <div className="cart__parentContainer">
      {displayLoggedView && productList.length > 0 && (
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
          {console.log('este es cartdetail', displayLoggedView)}
          <Button
            styling="cart__purchaseButton"
            text="Purchase"
            onclick={handleCartPurchase}
          />
        </div>
      )}
      {cartDetail.status && (
        <div className="cart__mainContainer">
          <h1>Cart is not created</h1>
        </div>
      )}

      {productList.length === 0 && !cartDetail.status && (
        <div className="loaderContainer">
          <LoaderWithRedirect />
        </div>
      )}
      {!displayLoggedView && window.location.replace('/')}
    </div>
  );
};

export default Cart;
