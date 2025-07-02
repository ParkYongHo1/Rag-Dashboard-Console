import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface RefreshTokenResponse {
  accessToken: string;
  accessTokenExpiresAt: number;
}

export const tokenService = {
  refresh: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    const response = await axios.post<RefreshTokenResponse>(
      `${API_BASE_URL}/auth/reissue`,
      { refreshToken }
    );

    return response.data;
  },
};
