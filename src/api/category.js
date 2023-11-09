import axios from 'axios';
import instance from '../api/index';

export default async function getCategory() {
  return await instance.get('products/categories');
}
