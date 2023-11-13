import axios from 'axios';
import instance from '../api/index';

export default async function getAllCarts() {
  return await instance.get('carts');
}
