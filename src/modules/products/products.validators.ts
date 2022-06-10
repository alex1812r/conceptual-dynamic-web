import * as yup from 'yup';

export const productSchema = yup.object({
  name: yup.string().required(),
  count: yup.number().required(),
  unitPrice: yup.number().required(),
  description: yup.string(),
  imgUrl: yup.string(),
})