import instance from './index';

export default async function getProducts() {
  return instance.get('products');
}
