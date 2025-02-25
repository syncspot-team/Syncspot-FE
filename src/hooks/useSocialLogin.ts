import { OAuthProvider, OAuthConfig } from '@src/types/oauthType';

export function useSocialLogin() {
  const oauthConfig: Record<OAuthProvider, OAuthConfig> = {
    KAKAO: {
      baseUrl: 'https://kauth.kakao.com/oauth/authorize',
      config: {
        client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
        redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URL,
        response_type: 'code',
      },
    },
    NAVER: {
      baseUrl: 'https://nid.naver.com/oauth2.0/authorize',
      config: {
        client_id: import.meta.env.VITE_NAVER_CLIENT_ID,
        redirect_uri: import.meta.env.VITE_NAVER_REDIRECT_URL,
        response_type: 'code',
        state: import.meta.env.VITE_NAVER_STATE,
      },
    },
    GOOGLE: {
      baseUrl: 'https://accounts.google.com/o/oauth2/auth',
      config: {
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URL,
        response_type: 'code',
        scope: 'email profile',
      },
    },
  };

  const handleSocialLogin = (provider: OAuthProvider) => {
    const { baseUrl, config } = oauthConfig[provider];
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    window.location.href = finalUrl;
  };

  return { handleSocialLogin };
}
