import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Loader from 'Components/loader/loader';
import getAllCarts from '../../api/carts';
import getUserInfo from '../../api/users';
import './giftCart.scss';
import { isUserLogged } from '../../utils/userLogged';

const GiftCart = () => {
  const [allCartsData, setAllCartsData] = useState([]);
  const [allUserInfo, setAllUserInfo] = useState([]);
  const [error, setError] = useState();
  const [userLogged, setUserLogged] = useState();
  const displayLoggedView = isUserLogged();
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
        setError('No carts data has been received.');
        console.log(error);
      }
      /*----*/
    } catch (errorApi) {
      console.log(error);
      alert(
        'There has been an error while retrieving the Gift carts data.',
      );
    }
  };
  const filteredCarts = allCartsData.filter(
    (userCart) => userCart.userId !== userLogged?.id,
  );

  useEffect(() => {
    getCarts();
    setUserLogged(JSON.parse(localStorage.getItem('userLogged')));
  }, [displayLoggedView]);
  return (
    <div className="userCart__parentContainer">
      {displayLoggedView &&
        allUserInfo &&
        allCartsData &&
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
        })}
      {displayLoggedView && !allCartsData && (
        <div className="loaderContainer">
          <Loader />
        </div>
      )}
      {!displayLoggedView && window.location.replace('/')}
    </div>
  );
};

export default GiftCart;
