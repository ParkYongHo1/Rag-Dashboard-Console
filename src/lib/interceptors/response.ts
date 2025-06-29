import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { useCompanyStore } from "@/stores/companyStore";
import { tokenService } from "@/services/token/api";
import { authService } from "@/services/auth/api";
import { triggerSessionExpired } from "@/hooks/useSessionExpired";

interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 인터셉터에서의 토큰 갱신 Promise (사전 갱신과 별도)
let interceptorRefreshPromise: Promise<string> | null = null;

export const setupResponseInterceptor = (apiClient: AxiosInstance) => {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryableAxiosRequestConfig;

      // 401 에러이고 아직 재시도하지 않은 경우
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const store = useCompanyStore.getState();

          if (!store.refreshToken) {
            throw new Error("No refresh token available");
          }

          let newAccessToken: string;

          // 이미 인터셉터에서 토큰 갱신이 진행 중인 경우
          if (interceptorRefreshPromise) {
            console.log("🔄 인터셉터 토큰 갱신 진행 중... 대기");
            newAccessToken = await interceptorRefreshPromise;
          }
          // 사전 갱신이 진행 중인 경우 잠시 대기
          else if (store.isRefreshing) {
            console.log("🔄 사전 토큰 갱신 진행 중... 잠시 대기");

            // 사전 갱신 완료까지 최대 5초 대기
            let waitCount = 0;
            while (store.isRefreshing && waitCount < 50) {
              await new Promise((resolve) => setTimeout(resolve, 100));
              waitCount++;
            }

            // 사전 갱신이 완료되었으면 새 토큰 사용
            if (!store.isRefreshing && store.accessToken) {
              newAccessToken = store.accessToken;
            } else {
              // 사전 갱신이 실패했으면 인터셉터에서 직접 갱신
              throw new Error(
                "Pre-refresh failed, starting interceptor refresh"
              );
            }
          }
          // 새로운 인터셉터 토큰 갱신 시작
          else {
            console.log("🚨 401 에러 발생 - 인터셉터에서 토큰 긴급 갱신");

            interceptorRefreshPromise = (async (): Promise<string> => {
              try {
                // 사전 갱신 타이머 일시 중단 (충돌 방지)
                store.clearRefreshTimer();

                const tokenResponse = await tokenService.refresh(
                  store.refreshToken!
                );

                // 스토어에 새 토큰 저장
                store.updateAccessToken(
                  tokenResponse.accessToken,
                  tokenResponse.accessTokenExpiresAt
                );

                // 사전 갱신 스케줄 재시작
                store.scheduleTokenRefresh();

                console.log("✅ 인터셉터 토큰 갱신 완료");
                return tokenResponse.accessToken;
              } finally {
                // Promise 정리
                interceptorRefreshPromise = null;
              }
            })();

            newAccessToken = await interceptorRefreshPromise;
          }

          // 원래 요청에 새 토큰 적용하여 재시도
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error("❌ 인터셉터 토큰 갱신 실패:", refreshError);

          // Promise 정리
          interceptorRefreshPromise = null;

          const store = useCompanyStore.getState();

          // 로그아웃 API 호출 (선택적)
          try {
            await authService.logout();
          } catch (logoutError) {
            console.error("로그아웃 API 호출 실패:", logoutError);
          }

          // 로컬 상태 정리
          store.logout();

          // 세션 만료 이벤트 발생 (React 컴포넌트에서 처리)
          triggerSessionExpired();

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
