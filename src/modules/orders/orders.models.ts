import { OrderInputType } from "./orders.types";

export const initialOrderInput: OrderInputType = {
  clientId: 0,
  orderDate: '',
  description: '',
  orderProducts: [
    { productId: 0, count: 0 }
  ]
}