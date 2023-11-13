import instance from './index';

export default async function getUserCart(id) {
  return instance.get(`carts/user/${id}`);
}
