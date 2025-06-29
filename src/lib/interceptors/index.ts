import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// 인터셉터 설정을 별도 함수로 분리
export const setupInterceptors = async () => {
  const { setupRequestInterceptor } = await import("./request");
  const { setupResponseInterceptor } = await import("./response");

  setupRequestInterceptor(apiClient);
  setupResponseInterceptor(apiClient);
};

// 앱 초기화 시 호출
setupInterceptors();
