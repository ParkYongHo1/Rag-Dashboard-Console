import axios from "axios";
import { LoginResponse } from "@/types/login";
import { apiClient } from "@/lib/interceptors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authService = {
  login: async (params: { companyId: string }) => {
    const response = await axios.post<LoginResponse>(
      `${API_BASE_URL}/auth/login`,
      params
    );
    return response.data;
  },
  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  },
};
