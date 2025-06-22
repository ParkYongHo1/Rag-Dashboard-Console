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
}

// 스토어 상태 타입
interface CompanyState {
  company: CompanyInfo | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  // 핵심 액션들만
  login: (company: CompanyInfo, tokens: Tokens) => void;
  logout: () => void;
  updateAccessToken: (accessToken: string) => void;
}

// Zustand 스토어 생성
export const useCompanyStore = create<CompanyState>()(
  persist(
    (set) => ({
      company: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      // 로그인 - 회사 정보와 토큰을 한번에 설정
      login: (company, tokens) => {
        set({
          company,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          isAuthenticated: true,
        });
      },

      // 로그아웃 - 모든 정보 초기화
      logout: () => {
        set({
          company: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },

      updateAccessToken: (accessToken) => {
        set({ accessToken });
      },
    }),
    {
      name: "company-storage",
      partialize: (state) => ({
        company: state.company,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
