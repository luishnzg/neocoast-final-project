import axios from 'axios';
import instance from '../api/index';

export default async function getProductDetail(id) {
  return await instance.get(`products/${id}`);
}
