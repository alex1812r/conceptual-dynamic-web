import { clientApi } from "../../shared/api";
import { cleanObject, getPaginateParamsByPage } from "../../shared/utils";
import { ClientInputType, ClientListFilterType, ClientType, UpdateClientInputType } from "./clients.types";

export const fetchClientsListAction = async (filter: ClientListFilterType)  => {
  const { page, perPage, ...restFilter } = filter;

  const queryParams = new URLSearchParams(cleanObject({
    ...getPaginateParamsByPage(page, perPage), 
    ...restFilter
  })).toString();

  const fetchUrl = `/clients?${queryParams}`

  const res = await clientApi.get<{ 
    clientsList: Array<ClientType>;
    count: number
  }>(fetchUrl);
  
  return res.data;
};

export const fetchClientAction = async (id: number) => {
  const res = await clientApi.get(`/clients/${id}`);
  return res.data;
};

export const createClientAction = async (data: ClientInputType) => {
  const res = await clientApi.post<{ client: ClientType }>('/clients', data);
  return res.data
};

export const updateClientAction = async (data: UpdateClientInputType) => {
  const { id, ...restData } = data;
  const res = await clientApi.put<{ client: ClientType }>(`/clients/${id}`, restData);
  return res.data
}

export const deleteClientAction = async (id: number) => {
  const res = await clientApi.delete<{ success: boolean }>(`/clients/${id}`);
  return res.data
};