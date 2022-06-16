import { clientApi } from "../../shared/api";
import { cleanObject, getPaginateParamsByPage } from "../../shared/utils";
import { OrderInputType, OrdersFilterType, OrderType } from "./orders.types";

export const fetchOrdersListAction = async (filter: OrdersFilterType = {})  => {
  const { page, perPage, ...restFilter } = filter;

  const queryParams = new URLSearchParams(cleanObject({
    ...getPaginateParamsByPage(page, perPage), 
    ...restFilter
  })).toString();

  const fetchUrl = `/orders?${queryParams}`;
  
  const res = await clientApi.get<{ 
    ordersList: Array<OrderType>;
    count: number; 
  }>(fetchUrl);
  return res.data;
};

export const fetchOrderAction = async (id: number) => {
  const res = await clientApi.get<{ order: OrderType }>(`/orders/${id}`);
  return res.data;
};

export const createOrderAction = async (data: OrderInputType) => {
  const res = await clientApi.post<{ order: OrderType }>('/orders', data);
  return res.data
};

export const deleteOrderAction = async (id: number) => {
  const res = await clientApi.delete<{ success: boolean }>(`/orders/${id}`);
  return res.data
};