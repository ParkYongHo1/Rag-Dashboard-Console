export interface LoginResponse {
  accessToken: string;
  accessTokenExpiresAt: number;
  tableNamesList: [];
  company: string;
  message: string;
  refreshToken: string;
}
