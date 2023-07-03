import { CarModelInterface } from 'interfaces/car-model';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CarMakerInterface {
  id?: string;
  name: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  car_model?: CarModelInterface[];
  user?: UserInterface;
  _count?: {
    car_model?: number;
  };
}

export interface CarMakerGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  user_id?: string;
}
