import axios from 'axios';
import queryString from 'query-string';
import { CarShopInterface, CarShopGetQueryInterface } from 'interfaces/car-shop';
import { GetQueryInterface } from '../../interfaces';

export const getCarShops = async (query?: CarShopGetQueryInterface) => {
  const response = await axios.get(`/api/car-shops${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCarShop = async (carShop: CarShopInterface) => {
  const response = await axios.post('/api/car-shops', carShop);
  return response.data;
};

export const updateCarShopById = async (id: string, carShop: CarShopInterface) => {
  const response = await axios.put(`/api/car-shops/${id}`, carShop);
  return response.data;
};

export const getCarShopById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/car-shops/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCarShopById = async (id: string) => {
  const response = await axios.delete(`/api/car-shops/${id}`);
  return response.data;
};
