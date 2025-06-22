// api/axiosInstance.ts - 서비스를 활용한 개선된 버전
import axios from "axios";
import { useCompanyStore } from "@/stores/companyStore";
import { tokenService } from "../token/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10초 타임아웃
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    const { accessToken, isAuthenticated } = useCompanyStore.getState();

    // 인증이 필요한 요청에만 토큰 추가
    if (isAuthenticated && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

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
