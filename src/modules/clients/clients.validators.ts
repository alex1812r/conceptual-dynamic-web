import * as yup from 'yup';

export const clientSchema = yup.object({
  dni: yup.string().required(),
  name: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string(),
  dateOfBirth: yup.string().required(),
})