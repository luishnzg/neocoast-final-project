import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Loader from 'Components/loader/loader';
import getAllCarts from '../../api/carts';
import getUserInfo from '../../api/users';
import './giftCart.scss';

const GiftCart = () => {
  const [allCartsData, setAllCartsData] = useState([]);
  const [allUserInfo, setAllUserInfo] = useState([]);
  const [error, setError] = useState();
  const [userLogged, setUserLogged] = useState();
  const getCarts = async () => {
    try {
      const getAllCartsData = await getAllCarts();
      if (getAllCartsData) {
        setAllCartsData(getAllCartsData.data);
        const userCart = getAllCartsData.data.map((user) =>
          getUserInfo(user.userId),
        );
        Promise.all(userCart).then((data) => {
          setAllUserInfo(data);
        });
      } else {
        setError('No se han recibido datos del carrito del usuario.');
        console.log(error);
      }
      /*----*/
    } catch (error) {
      console.log(error);
    }
  };
  const filteredCarts = allCartsData.filter(
    (userCart) => userCart.userId !== userLogged?.id,
  );

  useEffect(() => {
    getCarts();
    setUserLogged(JSON.parse(localStorage.getItem('userLogged')));
  }, []);
  return (
    <div className="userCart__parentContainer">
      {allCartsData && allUserInfo ? (
        filteredCarts.map((userCart) => {
          const userInformation = allUserInfo.find(
            (user) => user.data.id === userCart.userId,
          );
          const userName = userInformation || 'not found';

          return (
            <div
              className="userCart__mainContainer"
              key={userCart.id}>
              {userName !== 'not found' && (
                <div className="userCart__subMainContainer">
                  <div className="userCart__cartInformation">
                    <p className="userCart__names">
                      {userName.data.name.firstname}{' '}
                      {userName.data.name.lastname}
                    </p>

                    <p className="userCart__cartNumner">
                      Cart Number: <span>{userCart.id}</span>
                    </p>
                  </div>
                  <div className="userCart__linkContainer">
                    <Link
                      className="userCart__link"
                      to={`/cart/${userName.data.id}/${userCart.id}`}>
                      {'View Cart '}
                    </Link>
                  </div>
                </div>
              )}
              {userName === 'not found' && (
                <div className="loaderContainer">
                  <Loader />
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="loaderContainer">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default GiftCart;
