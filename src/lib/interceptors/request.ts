import { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { useCompanyStore } from "@/stores/companyStore";

export const setupRequestInterceptor = (apiClient: AxiosInstance) => {
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const { accessToken, isAuthenticated } = useCompanyStore.getState();

      if (isAuthenticated && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
};
