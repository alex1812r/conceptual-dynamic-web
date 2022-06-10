import { clientApi } from "../../shared/api";
import { ProductInputType, ProductType } from "./products.types";

export const fetchProductsListAction = async ()  => {
  const res = await clientApi.get<{ productsList: Array<ProductType> }>('/products');
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