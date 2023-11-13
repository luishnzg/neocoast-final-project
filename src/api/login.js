import instance from './index';

export default async function getLoginUsers() {
  return instance.get('users');
}
