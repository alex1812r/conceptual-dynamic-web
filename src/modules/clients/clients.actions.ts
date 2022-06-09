import { clientApi } from "../../shared/api";
import { ClientType } from "./clients.types";

export const fetchClientsListAction = async ()  => {
  const res = await clientApi.get<{ clientsList: Array<ClientType> }>('/clients');
  return res.data;
};