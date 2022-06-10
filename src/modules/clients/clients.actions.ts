import { clientApi } from "../../shared/api";
import { ClientInputType, ClientType } from "./clients.types";

export const fetchClientsListAction = async ()  => {
  const res = await clientApi.get<{ clientsList: Array<ClientType> }>('/clients');
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