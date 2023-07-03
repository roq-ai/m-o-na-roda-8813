import * as yup from 'yup';

export const carValidationSchema = yup.object().shape({
  mileage: yup.number().integer().required(),
  purchase_date: yup.date().required(),
  car_model_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
