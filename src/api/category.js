import instance from './index';

export default async function getCategory() {
  return instance.get('products/categories');
}
