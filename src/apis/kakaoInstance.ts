import axios from 'axios';

export const kakaoInstance = axios.create({
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
  },
});
