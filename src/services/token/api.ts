import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface RefreshTokenResponse {
  acceessToken: string; // 백엔드 오타 그대로
  refreshToken: string;
  message?: string;
}

// 토큰 관련 서비스
export const tokenService = {
  // 토큰 갱신
  refresh: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    const response = await axios.post<RefreshTokenResponse>(
      `${API_BASE_URL}/refresh`,
      { refreshToken }
    );
    return response.data;
  },

  logout: async (refreshToken: string): Promise<void> => {
    try {
      await axios.post(`${API_BASE_URL}/logout`, {
        refreshToken,
      });
    } catch (error) {
      console.error("Logout API failed:", error);
    }
  },
};
