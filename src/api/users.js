import axios from 'axios';
import instance from '../api/index';

export default async function getUserInfo(id) {
  return await instance.get(`users/${id}`);
}
