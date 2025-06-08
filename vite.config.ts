import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    // 테스트 환경 설정
    environment: "jsdom",
    // 테스트 파일 패턴
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    // 글로벌 설정 (describe, it, expect 등을 import 없이 사용)
    globals: true,
    // 테스트 셋업 파일
    setupFiles: "./src/test/setup.ts",
  },
  server: {
    port: 5173,
    open: true,
  },
});
