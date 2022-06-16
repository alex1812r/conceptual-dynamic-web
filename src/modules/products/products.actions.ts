import { clientApi } from "../../shared/api";
import { cleanObject, getPaginateParamsByPage } from "../../shared/utils";
import { ProductInputType, ProductListFilterType, ProductType, UpdateProductInputType } from "./products.types";

export const fetchProductsListAction = async (filter: ProductListFilterType = {})  => { 
  const { page, perPage, ...restFilter } = filter;

  const queryParams = new URLSearchParams(cleanObject({
    ...getPaginateParamsByPage(page, perPage), 
    ...restFilter
  })).toString();

  const fetchUrl = `/products?${queryParams}`;

  const res = await clientApi.get<{ 
    productsList: Array<ProductType>;
    count: number;
  }>(fetchUrl);

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

export const updateProductAction = async (data: UpdateProductInputType) => {
  const { id, ...restData } = data;
  const res = await clientApi.put<{ product: ProductType }>(`/products/${id}`, restData);
  return res.data
}

export const deleteProductAction = async (id: number) => {
  const res = await clientApi.delete<{ success: boolean }>(`/products/${id}`);
  return res.data
};