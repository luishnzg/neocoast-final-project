import instance from './index';

export default async function getProductDetail(id) {
  return instance.get(`products/${id}`);
}
