import { BaseEntityType } from "../../shared/types";
import { ClientType } from "../clients/clients.types";
import { ProductType } from "../products/products.types";

export enum OrderStatusEnum {
  pending = 'pending',
  paid = 'paid',
  rejected = 'rejected'
}

export type OrderStatusType = keyof typeof OrderStatusEnum;

export type OrderType = BaseEntityType & {
  clientId: string;
  client?: ClientType;
  total: number;
  status: OrderStatusType;
  orderProducts: Array<OrderProductType>;
}

export type OrderProductType = BaseEntityType & {
  orderId: number;
  order?: OrderType
  productId: number;
  product?: ProductType;
}

export type OrderInputType = { 
  clientId: number;
  orderProducts: Array<{
    productId: number;
    count: number;
  }>;
}