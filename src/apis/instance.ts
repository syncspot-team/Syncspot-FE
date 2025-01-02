import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URI;
const REFRESH_URL = BACKEND_URL + '/api/auth/refresh';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

export const instance = axios.create({
  baseURL: BACKEND_URL,
  responseType: 'json',
  headers: { 'Content-Type': 'application/json' },
  timeout: 4000, // LCP기준 4초 초과시 BAD이므로 4000ms로 설정
  withCredentials: true,
});

// 새로운 accessToken, refreshToken 발급 함수
const getNewToken = async () => {
  try {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.get(REFRESH_URL, {
      headers: {
        'Authorization-refresh': `Bearer ${refreshToken}`,
      },
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
    return { accessToken, refreshToken: newRefreshToken };
  } catch (e) {
    return null;
  }
};

instance.interceptors.request.use(
  (config) => {
    const accessToken: string | null = localStorage.getItem(ACCESS_TOKEN);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    //  402에러가 아니거나 재요청이거나 refresh 요청인 경우 그냥 에러 발생
    if (response.status !== 402 || config.sent || config.url === REFRESH_URL) {
      return Promise.reject(error);
    }

    config.sent = true; // 무한 재요청 방지를 위한 코드

    const newToken = await getNewToken();

    if (newToken) {
      localStorage.setItem(ACCESS_TOKEN, newToken.accessToken);
      localStorage.setItem(REFRESH_TOKEN, newToken.refreshToken);
      config.headers.Authorization = `Bearer ${newToken.accessToken}`;
      return instance(config); // 재요청
    }

    return Promise.reject(error);
  },
);
