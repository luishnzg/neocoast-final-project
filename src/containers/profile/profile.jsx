import React, { useEffect, useState } from 'react';
import Loader from 'Components/loader/loader';
import getUserInfo from '../../api/users';
import './profile.scss';
import { isUserLogged } from '../../utils/userLogged';

const Profile = () => {
  const [userId, setUserId] = useState();
  const [loggedView, setLoggedView] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({});
  const displayLoggedView = isUserLogged();
  const getUser = async (id) => {
    try {
      const getUserData = await getUserInfo(id);
      console.log('get user data', getUserData.data);
      if (getUserData) {
        setUserData(getUserData.data);
      } else {
        setError('No se ha recibido dato del usuario.');
        console.log(error);
      }
    } catch (errorApi) {
      console.log(errorApi);
      setError('Hubo un error al cargar los datos del usuario.');
    }
  };
  const settingUserID = () => {
    setUserId(
      JSON.parse(localStorage.getItem('userLogged')).id.toString(),
    );
    if (!(userId === null)) {
      setLoggedView(true);
    } else {
      setLoggedView(false);
      window.location.replace('/');
    }
  };

  useEffect(() => {
    settingUserID();
    getUser(userId);
  }, [displayLoggedView, userId]);
  return (
    <div className="userData__parentContainer">
      {displayLoggedView && userData.name ? (
        <div className="userData__container">
          <h1 className="userData__title">User Profile</h1>
          <div>
            <label htmlFor="name">First Name</label>
            <input value={userData.name.firstname} disabled />
            {console.log(
              'userdata imprimido en el first name',
              userData,
            )}
            {console.log('loggedview', displayLoggedView)}
          </div>
          <div>
            <label htmlFor="name">Last Name</label>
            <input value={userData.name.lastname} disabled />
          </div>
          <div>
            <label htmlFor="name">User Name</label>
            <input value={userData.username} disabled />
          </div>
          <div>
            <label htmlFor="name">E-mail</label>
            <input value={userData.email} disabled />
          </div>
          <div>
            <label htmlFor="name">Phone Number</label>
            <input value={userData.phone} disabled />
          </div>
          <div>
            <label htmlFor="name">City</label>
            <input value={userData.address.city} disabled />
          </div>
          <div>
            <label htmlFor="name">Street</label>
            <input value={userData.address.street} disabled />
          </div>
          <div>
            <label htmlFor="name">Street</label>
            <input value={userData.address.number} disabled />
          </div>
          <div>
            <label htmlFor="name">Street</label>
            <input value={userData.address.zipcode} disabled />
          </div>
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
      {!displayLoggedView && window.location.replace('/')}
    </div>
  );
};

export default Profile;
