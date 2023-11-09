import axios from 'axios';
import instance from '../api/index';

export default async function getLoginUsers() {
  return await instance.get('users');
}
