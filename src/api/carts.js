import instance from './index';

export default async function getAllCarts() {
  return instance.get('carts');
}
