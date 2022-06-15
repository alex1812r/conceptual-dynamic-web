import * as yup from 'yup';

export const productSchema = yup.object({
  name: yup.string().required(),
  count: yup.number().min(0).required(),
  unitPrice: yup.number().min(0).required(),
  description: yup.string(),
  imgUrl: yup.string(),
})