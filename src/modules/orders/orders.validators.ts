import * as yup from 'yup';

export const orderSchema = yup.object({
  clientId: yup.number().min(1, 'client invalid').required(),
  orderDate: yup.date().required(),
  orderProducts: yup.array(yup.object({
    productId: yup.number().min(1, 'product invalid').required(),
    count: yup.number().min(1, 'count required').required()
  })).min(1)
});