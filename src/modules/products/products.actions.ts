import { clientApi } from "../../shared/api";
import { cleanObject } from "../../shared/utils";
import { ProductInputType, ProductListFilterType, ProductType } from "./products.types";

export const fetchProductsListAction = async (filter: ProductListFilterType = {})  => {
  const queryParams = new URLSearchParams(cleanObject(filter)).toString();
  const fetchUrl = `/products?${queryParams}`
  const res = await clientApi.get<{ productsList: Array<ProductType> }>(fetchUrl);
  return res.data;
};

export const fetchProductAction = async (id: number) => {
  const res = await clientApi.get<{ product: ProductType }>(`/products/${id}`);
  return res.data;
};

export const createProductAction = async (input: ProductInputType) => {
  const res = await clientApi.post<{ product: ProductType }>('/products', input);
  return res.data;
};

export const deleteProductAction = async (id: number) => {
  const res = await clientApi.delete<{ success: boolean }>(`/products/${id}`);
  return res.data
};