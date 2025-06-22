import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { useCompanyStore } from "@/stores/companyStore";
import { tokenService } from "@/services/token/api";

interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const setupResponseInterceptor = (apiClient: AxiosInstance) => {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryableAxiosRequestConfig;

      // 401 에러 처리 (토큰 만료)
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const store = useCompanyStore.getState();

          if (!store.refreshToken) {
            throw new Error("No refresh token available");
          }

          // 토큰 갱신 API 호출
          const tokenResponse = await tokenService.refresh(store.refreshToken);

          // 새 액세스 토큰 저장
          const newAccessToken = tokenResponse.acceessToken;
          store.updateAccessToken(newAccessToken);

          // 원래 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);

          // 토큰 갱신 실패 시 로그아웃 처리
          const store = useCompanyStore.getState();
          await tokenService.logout(store.refreshToken || "");
          store.logout();

          // 로그인 페이지로 리다이렉트
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
