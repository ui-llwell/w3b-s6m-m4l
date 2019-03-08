import request from '@/utils/request';

export async function queryProvince() {
  return request('/api/geographic/province');
}

export async function queryCity(province) {
  return request(`/api/geographic/city/${province}`);
}

export async function getBrandsGoods(params) {
  return request('http://192.168.0.127:54195/llback/NewHomePage/BrandsGoods', {
   //return request('/llback/NewHomePage/HomePageDownPart', {
   method: 'POST',
   body: params,
 });
}