import axios from 'axios';
import instance from '../api/index';

export default async function getProducts() {
  return await instance.get('products');
}
