import { BaseEntityType, BaseFilterType, FileInputType, FileType } from "../../shared/types";

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
  imageId?: string;
  image?: FileType;
}

export type ProductInputType = {
  name: string;
  count: number;
  description?: string;
  unitPrice: number;
  image?: FileInputType
}

export type UpdateProductInputType = Partial<Omit<ProductInputType, 'image'>> & {
  id: number;
  updateImage?: FileInputType
}

export type ProductListFilterType = BaseFilterType & {}