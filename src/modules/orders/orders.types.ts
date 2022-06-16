import { BaseEntityType, BaseFilterType } from "../../shared/types";
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
  orderDate: string;
  description: string;
  orderProducts?: Array<OrderProductType>;
}

export type OrderProductType = BaseEntityType & {
  orderId: number;
  order?: OrderType
  productId: number;
  product?: ProductType;
  count: number;
  amount: number;
}

export type OrderInputType = { 
  clientId: number;
  orderDate: string;
  description?: string;
  orderProducts: Array<{
    productId: number;
    count: number;
  }>;
}

export type OrdersFilterType = BaseFilterType & {}