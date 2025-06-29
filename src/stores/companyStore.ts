import { create } from "zustand";
import { persist } from "zustand/middleware";

// 회사 정보 타입 정의
export interface CompanyInfo {
  company: string;
  tableNamesList: string[];
}

// 토큰 타입 정의
interface Tokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
}

// 스토어 상태 타입
interface CompanyState {
  company: CompanyInfo | null;
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiresAt: number | null;
  isAuthenticated: boolean;
  refreshTimer: NodeJS.Timeout | null;
  isRefreshing: boolean;

  // 핵심 액션들
  login: (company: CompanyInfo, tokens: Tokens) => void;
  logout: () => void;
  updateAccessToken: (accessToken: string, expiresAt?: number) => void;
  scheduleTokenRefresh: () => void;
  clearRefreshTimer: () => void;
  setRefreshing: (isRefreshing: boolean) => void;
}

// 토큰 갱신 함수
const refreshAccessToken = async () => {
  const store = useCompanyStore.getState();

  // 이미 갱신 중이면 중복 실행 방지
  if (store.isRefreshing) {
    console.log("🔄 토큰 갱신이 이미 진행 중입니다.");
    return;
  }

  try {
    store.setRefreshing(true);

    const { tokenService } = await import("@/services/token/api");

    if (!store.refreshToken) {
      throw new Error("No refresh token available");
    }

    console.log("🔄 사전 토큰 갱신 시작...", new Date());
    const response = await tokenService.refresh(store.refreshToken);

    // 새 토큰 정보 업데이트
    store.updateAccessToken(
      response.accessToken,
      response.accessTokenExpiresAt
    );
    console.log(response.accessTokenExpiresAt);

    console.log(
      "✅ 사전 토큰 갱신 완료",
      new Date(response.accessTokenExpiresAt)
    );

    // 다음 갱신 스케줄 (중요: 새로운 만료시간 기준으로)
    store.scheduleTokenRefresh();
  } catch (error) {
    console.error("❌ 사전 토큰 갱신 실패:", error);

    // 갱신 실패 시 로그아웃 처리
    const store = useCompanyStore.getState();
    store.logout();

    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  } finally {
    store.setRefreshing(false);
  }
};

// Zustand 스토어 생성
export const useCompanyStore = create<CompanyState>()(
  persist(
    (set, get) => ({
      company: null,
      accessToken: null,
      refreshToken: null,
      accessTokenExpiresAt: null,
      isAuthenticated: false,
      refreshTimer: null,
      isRefreshing: false,

      login: (company, tokens) => {
        // 기존 타이머 정리
        const currentTimer = get().refreshTimer;
        if (currentTimer) {
          clearTimeout(currentTimer);
        }

        console.log(
          "🔐 로그인 - 토큰 만료시간:",
          new Date(tokens.accessTokenExpiresAt)
        );

        set({
          company,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          accessTokenExpiresAt: tokens.accessTokenExpiresAt,
          isAuthenticated: true,
          refreshTimer: null,
          isRefreshing: false,
        });

        // 토큰 갱신 스케줄링 시작
        get().scheduleTokenRefresh();
      },

      logout: () => {
        // 타이머 정리
        const currentTimer = get().refreshTimer;
        if (currentTimer) {
          clearTimeout(currentTimer);
        }

        console.log("🚪 로그아웃 처리");

        set({
          company: null,
          accessToken: null,
          refreshToken: null,
          accessTokenExpiresAt: null,
          isAuthenticated: false,
          refreshTimer: null,
          isRefreshing: false,
        });
      },

      updateAccessToken: (accessToken, expiresAt) => {
        set((state) => ({
          accessToken,
          accessTokenExpiresAt: expiresAt || state.accessTokenExpiresAt,
        }));
      },

      scheduleTokenRefresh: () => {
        const state = get();
        const { accessTokenExpiresAt, refreshTimer, isRefreshing } = state;

        // 기존 타이머 정리
        if (refreshTimer) {
          console.log("타이머 정리");

          clearTimeout(refreshTimer);
          set({ refreshTimer: null });
        }

        // 이미 갱신 중이면 스케줄하지 않음
        if (isRefreshing) {
          console.log("🔄 토큰 갱신 중이므로 스케줄링을 건너뜁니다.");
          return;
        }

        if (!accessTokenExpiresAt) {
          console.warn(
            "⚠️ 토큰 만료 시간이 없어서 자동 갱신을 스케줄할 수 없습니다."
          );
          return;
        }

        const now = Date.now();
        const expiresAt = accessTokenExpiresAt;

        // 토큰 만료 30초 전에 갱신 (안전한 시간)
        const REFRESH_BEFORE_EXPIRY = 30 * 1000;
        const refreshTime = expiresAt - REFRESH_BEFORE_EXPIRY;

        console.log("📅 현재 시간:", new Date(now));
        console.log("📅 토큰 만료시간:", new Date(expiresAt));
        console.log("📅 갱신 예정시간:", new Date(refreshTime));

        // 이미 갱신 시점이 지났거나 2분 미만 남은 경우 즉시 갱신
        if (now >= refreshTime) {
          console.log("🚨 토큰 갱신 시점입니다. 즉시 갱신합니다.");
          refreshAccessToken();
          return;
        }

        // 갱신까지 남은 시간 계산
        const timeUntilRefresh = refreshTime - now;

        console.log(
          `⏰ ${Math.round(timeUntilRefresh / (60 * 1000))}분 ${Math.round(
            (timeUntilRefresh % (60 * 1000)) / 1000
          )}초 후 토큰 갱신 예정`
        );

        const newTimer = setTimeout(() => {
          console.log("⏰ 예약된 토큰 갱신 시작");
          refreshAccessToken();
        }, timeUntilRefresh);

        set({ refreshTimer: newTimer });
      },

      clearRefreshTimer: () => {
        const currentTimer = get().refreshTimer;
        if (currentTimer) {
          clearTimeout(currentTimer);
          set({ refreshTimer: null });
        }
      },

      setRefreshing: (isRefreshing) => {
        set({ isRefreshing });
      },
    }),
    {
      name: "company-storage",
      partialize: (state) => ({
        company: state.company,
        refreshToken: state.refreshToken,
        accessTokenExpiresAt: state.accessTokenExpiresAt,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
      }),
      // 복원 완료 시 콜백
      onRehydrateStorage: () => {
        console.log("🔄 Zustand persist 복원 시작");

        return (state, error) => {
          if (error) {
            console.error("❌ Zustand persist 복원 실패:", error);
          } else {
            console.log("✅ Zustand persist 복원 완료", state);

            // 복원 완료 후 토큰 상태 검증 및 초기화
            if (state?.isAuthenticated && state?.accessTokenExpiresAt) {
              // 토큰 만료 검사
              if (Date.now() >= state.accessTokenExpiresAt) {
                console.warn("⚠️ 복원된 토큰이 만료됨 - 로그아웃 처리");
                state.logout?.();
                if (typeof window !== "undefined") {
                  window.location.href = "/login";
                }
              } else {
                // 유효한 토큰이면 갱신 스케줄 시작
                console.log("✅ 유효한 토큰 복원 - 갱신 스케줄 시작");
                setTimeout(() => {
                  state.scheduleTokenRefresh?.();
                }, 100); // 약간의 지연을 두어 완전한 초기화 보장
              }
            }
          }
        };
      },
    }
  )
);

// 페이지 로드 시 토큰 갱신 스케줄 복원
export const initializeTokenRefresh = () => {
  const store = useCompanyStore.getState();

  if (!store.isAuthenticated || !store.accessTokenExpiresAt) {
    return;
  }

  const now = Date.now();
  const expiresAt = store.accessTokenExpiresAt;

  console.log("🔄 페이지 로드 - 토큰 상태 확인");
  console.log("현재 시간:", new Date(now));
  console.log("토큰 만료시간:", new Date(expiresAt));

  // 토큰이 이미 만료된 경우
  if (now >= expiresAt) {
    console.warn("⚠️ 토큰이 이미 만료되었습니다. 로그아웃 처리합니다.");
    store.logout();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return;
  }

  // 토큰이 유효하면 갱신 스케줄 복원
  console.log("✅ 토큰이 유효합니다. 갱신 스케줄을 복원합니다.");
  store.scheduleTokenRefresh();
};

// 페이지 언로드 시 타이머 정리
export const cleanupTokenRefresh = () => {
  const store = useCompanyStore.getState();
  store.clearRefreshTimer();
};

// 사용자 활동 감지하여 토큰 갱신 (선택적)
let activityTimer: NodeJS.Timeout | null = null;

export const setupActivityListener = () => {
  const resetActivityTimer = () => {
    if (activityTimer) {
      clearTimeout(activityTimer);
    }

    // 30분 동안 활동이 없으면 갱신 중단
    activityTimer = setTimeout(() => {
      const store = useCompanyStore.getState();
      console.log("😴 사용자 비활성 상태 - 토큰 갱신 일시 중단");
      store.clearRefreshTimer();
    }, 30 * 60 * 1000);
  };

  // 사용자 활동 이벤트 리스너
  const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];

  events.forEach((event) => {
    document.addEventListener(event, resetActivityTimer, true);
  });

  // 초기 타이머 설정
  resetActivityTimer();

  // 정리 함수 반환
  return () => {
    events.forEach((event) => {
      document.removeEventListener(event, resetActivityTimer, true);
    });
    if (activityTimer) {
      clearTimeout(activityTimer);
    }
  };
};
