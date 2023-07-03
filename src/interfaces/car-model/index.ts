import { CarInterface } from 'interfaces/car';
import { CarMakerInterface } from 'interfaces/car-maker';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CarModelInterface {
  id?: string;
  name: string;
  year: number;
  car_maker_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  car?: CarInterface[];
  car_maker?: CarMakerInterface;
  user?: UserInterface;
  _count?: {
    car?: number;
  };
}

export interface CarModelGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  car_maker_id?: string;
  user_id?: string;
}
