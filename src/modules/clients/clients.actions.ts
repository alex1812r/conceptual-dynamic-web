import { clientApi } from "../../shared/api";
import { cleanObject } from "../../shared/utils";
import { ClientInputType, ClientListFilterType, ClientType } from "./clients.types";

export const fetchClientsListAction = async (filter: ClientListFilterType)  => {
  const queryParams = new URLSearchParams(cleanObject(filter)).toString();
  const fetchUrl = `/clients?${queryParams}`
  const res = await clientApi.get<{ clientsList: Array<ClientType> }>(fetchUrl);
  return res.data;
};

export const fetchClientAction = async (id: number) => {
  const res = await clientApi.get(`/clients/${id}`);
  return res.data;
};

export const createClientAction = async (data: ClientInputType) => {
  const res = await clientApi.post<{ client: ClientType }>('/clients', data);
  return res.data
}