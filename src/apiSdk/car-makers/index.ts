import axios from 'axios';
import queryString from 'query-string';
import { CarMakerInterface, CarMakerGetQueryInterface } from 'interfaces/car-maker';
import { GetQueryInterface } from '../../interfaces';

export const getCarMakers = async (query?: CarMakerGetQueryInterface) => {
  const response = await axios.get(`/api/car-makers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCarMaker = async (carMaker: CarMakerInterface) => {
  const response = await axios.post('/api/car-makers', carMaker);
  return response.data;
};

export const updateCarMakerById = async (id: string, carMaker: CarMakerInterface) => {
  const response = await axios.put(`/api/car-makers/${id}`, carMaker);
  return response.data;
};

export const getCarMakerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/car-makers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCarMakerById = async (id: string) => {
  const response = await axios.delete(`/api/car-makers/${id}`);
  return response.data;
};
