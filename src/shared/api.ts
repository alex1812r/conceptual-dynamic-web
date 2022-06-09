import axios from "axios";
import { SERVER_URL } from "./constants";

export const client = axios.create({
  baseURL: SERVER_URL
});

export const clientApi = axios.create({
  baseURL: `${SERVER_URL}/api`
});