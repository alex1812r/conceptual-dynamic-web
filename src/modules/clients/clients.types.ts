import { BaseEntityType } from "../../shared/types";
import { OrderType } from "../orders/orders.types";

export enum ClientStatusEnum {
  active = 'active',
  inactive = 'inactive'
}

export type ClientStatusType = keyof typeof ClientStatusEnum;

export type ClientType = BaseEntityType & {
  dni: string;
  name: string;
  lastname: string;
  email: string;
  phone?: string;
  dateOfBirth: string;
  status: ClientStatusType;
  orders?: Array<OrderType>
}

export type ClientInputType = {
  dni: string;
  name: string;
  lastname: string;
  email: string;
  phone?: string;
  dateOfBirth: string;
}

export type UpdateClientInputType = Partial<ClientInputType> & {
  id: number;
}

export type ClientListFilterType = {
  q?: string
}
