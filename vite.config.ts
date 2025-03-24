import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tsconfigPaths(), svgr()],
    server: {
      port: 3000,
    },
    define: {
      'import.meta.env.VITE_BACKEND_URL': JSON.stringify(env.VITE_BACKEND_URL),
      'import.meta.env.VITE_KAKAO_REST_API_KEY': JSON.stringify(
        env.VITE_KAKAO_REST_API_KEY,
      ),
      'import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY': JSON.stringify(
        env.VITE_KAKAO_JAVASCRIPT_KEY,
      ),
      'import.meta.env.VITE_KAKAO_REDIRECT_URL': JSON.stringify(
        env.VITE_KAKAO_REDIRECT_URL,
      ),
      'import.meta.env.VITE_GOOGLE_CLIENT_ID': JSON.stringify(
        env.VITE_GOOGLE_CLIENT_ID,
      ),
      'import.meta.env.VITE_GOOGLE_CLIENT_SECRET': JSON.stringify(
        env.VITE_GOOGLE_CLIENT_SECRET,
      ),
      'import.meta.env.VITE_GOOGLE_REDIRECT_URL': JSON.stringify(
        env.VITE_GOOGLE_REDIRECT_URL,
      ),
      'import.meta.env.VITE_NAVER_CLIENT_ID': JSON.stringify(
        env.VITE_NAVER_CLIENT_ID,
      ),
      'import.meta.env.VITE_NAVER_CLIENT_SECRET': JSON.stringify(
        env.VITE_NAVER_CLIENT_SECRET,
      ),
      'import.meta.env.VITE_NAVER_STATE': JSON.stringify(env.VITE_NAVER_STATE),
      'import.meta.env.VITE_NAVER_REDIRECT_URL': JSON.stringify(
        env.VITE_NAVER_REDIRECT_URL,
      ),
      'import.meta.env.VITE_EMAILJS_SERVICE_ID': JSON.stringify(
        env.VITE_EMAILJS_SERVICE_ID,
      ),
      'import.meta.env.VITE_EMAILJS_TEMPLATE_ID': JSON.stringify(
        env.VITE_EMAILJS_TEMPLATE_ID,
      ),
      'import.meta.env.VITE_EMAILJS_PUBLIC_KEY': JSON.stringify(
        env.VITE_EMAILJS_PUBLIC_KEY,
      ),
    },
  };
});
