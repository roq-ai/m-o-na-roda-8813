import * as yup from 'yup';

export const carModelValidationSchema = yup.object().shape({
  name: yup.string().required(),
  year: yup.number().integer().required(),
  car_maker_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
