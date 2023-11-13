import instance from './index';

export default async function getUserInfo(id) {
  return instance.get(`users/${id}`);
}
