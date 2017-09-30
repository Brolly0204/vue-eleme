import axios from 'axios';

const API = {
  getSeller: '/api/seller',
  getGoods: '/api/goods',
  getRatings: '/api/ratings'
};

// 获取商家信息
export const getSeller = () => axios.get(API.getSeller);

// 获取商品列表
export const getGoods = () => axios.get(API.getGoods);

// 获取评价信息
export const getRatings = () => axios.get(API.getRatings);
