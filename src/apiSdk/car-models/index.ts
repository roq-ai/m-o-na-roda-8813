import axios from 'axios';
import queryString from 'query-string';
import { CarModelInterface, CarModelGetQueryInterface } from 'interfaces/car-model';
import { GetQueryInterface } from '../../interfaces';

export const getCarModels = async (query?: CarModelGetQueryInterface) => {
  const response = await axios.get(`/api/car-models${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCarModel = async (carModel: CarModelInterface) => {
  const response = await axios.post('/api/car-models', carModel);
  return response.data;
};

export const updateCarModelById = async (id: string, carModel: CarModelInterface) => {
  const response = await axios.put(`/api/car-models/${id}`, carModel);
  return response.data;
};

export const getCarModelById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/car-models/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCarModelById = async (id: string) => {
  const response = await axios.delete(`/api/car-models/${id}`);
  return response.data;
};
