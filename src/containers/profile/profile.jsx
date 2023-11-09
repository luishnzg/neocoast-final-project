import getUserInfo from '../../api/users';
import React, { useEffect, useState } from 'react';

import '../profile/profile.scss';
const Profile = () => {
  const [userId, setUserId] = useState();
  const [loggedView, setLoggedView] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({});
  const [userDataName, setUserDataName] = useState({});
  const [userDataAddress, setUserDataAddress] = useState('');
  const getUser = async (id) => {
    try {
      const getUserData = await getUserInfo(id);
      /*  console.log(getUserData.data); */
      if (getUserData) {
        setUserData(getUserData.data);
        setUserDataName(getUserData.data.name);
        setUserDataAddress(getUserData.data.address);
      } else {
        setError('No se ha recibido dato del usuario.');
      }
    } catch (error) {
      console.log(error);
      setError('Hubo un error al cargar los datos del usuario.');
    }
  };
  const isUserLogged = () => {
    setUserId(
      JSON.parse(localStorage.getItem('userLogged')).id.toString(),
    );
    if (!(userId === null)) {
      setLoggedView(true);
      console.log('se ve bien');
    } else {
      setLoggedView(false);
      window.location.replace('/');
    }
  };

  useEffect(() => {
    isUserLogged();
    getUser(userId);
  }, [loggedView, userId]);
  return (
    <div className="userData__parentContainer">
      {loggedView ? (
        <div className="userData__container">
          <h1 className="userData__title">User Profile</h1>
          <div>
            <label>First Name</label>
            <input value={userDataName.firstname} disabled />
          </div>
          <div>
            <label>Last Name</label>
            <input value={userDataName.lastname} disabled />
          </div>
          <div>
            <label>User Name</label>
            <input value={userData.username} disabled />
          </div>
          <div>
            <label>E-mail</label>
            <input value={userData.email} disabled />
          </div>
          <div>
            <label>Phone Number</label>
            <input value={userData.phone} disabled />
          </div>
          <div>
            <label>City</label>
            <input value={userDataAddress.city} disabled />
          </div>
          <div>
            <label>Street</label>
            <input value={userDataAddress.street} disabled />
          </div>
          <div>
            <label>Street</label>
            <input value={userDataAddress.number} disabled />
          </div>
          <div>
            <label>Street</label>
            <input value={userDataAddress.zipcode} disabled />
          </div>
        </div>
      ) : (
        <div>
          <h1>Prueba</h1>
          <p>salio mal</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
