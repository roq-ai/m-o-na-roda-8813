import { CarModelInterface } from 'interfaces/car-model';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CarInterface {
  id?: string;
  mileage: number;
  purchase_date: any;
  car_model_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  car_model?: CarModelInterface;
  user?: UserInterface;
  _count?: {};
}

export interface CarGetQueryInterface extends GetQueryInterface {
  id?: string;
  car_model_id?: string;
  user_id?: string;
}
