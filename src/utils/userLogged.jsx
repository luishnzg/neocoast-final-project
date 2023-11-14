export const isUserLogged = () => {
  const userLogged = JSON.parse(localStorage.getItem('userLogged'));
  return userLogged !== null;
};
