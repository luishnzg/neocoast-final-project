import axios from 'axios';
import instance from '../api/index';

export default async function getUserCart(id) {
  return await instance.get(`carts/user/${id}`);
}
