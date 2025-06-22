import axios from "axios";
import { LoginResponse } from "@/types/login";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginService = {
  login: async (params: { companyId: string }) => {
    const response = await axios.post<LoginResponse>(
      `${API_BASE_URL}/auth/login`,
      params
    );
    return response.data;
  },
};
