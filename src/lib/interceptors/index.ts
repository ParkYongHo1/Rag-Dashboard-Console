import axios from "axios";
import { setupRequestInterceptor } from "./request";
import { setupResponseInterceptor } from "./response";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

setupRequestInterceptor(apiClient);
setupResponseInterceptor(apiClient);
