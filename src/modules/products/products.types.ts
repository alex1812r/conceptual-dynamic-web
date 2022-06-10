import { BaseEntityType } from "../../shared/types";

export enum ProductStatusEnum {
  available = 'available',
  soldout = 'soldout'
}

export type ProductStatusType = keyof typeof ProductStatusEnum

export type ProductType = BaseEntityType & {
  name: string;
  count: number;
  description?: string;
  unitPrice: number;
  status: ProductStatusType;
  imgUrl: string;
}

export type ProductInputType = {
  name: string;
  count: number;
  description?: string;
  unitPrice: number;
  imgUrl?: string;
}