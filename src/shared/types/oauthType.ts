export const OauthProvider = {
  KAKAO: 'KAKAO',
  NAVER: 'NAVER',
  GOOGLE: 'GOOGLE',
} as const;

export type OAuthProvider = (typeof OauthProvider)[keyof typeof OauthProvider];

export interface OAuthConfig {
  baseUrl: string;
  config: {
    client_id: string;
    redirect_uri: string;
    response_type: string;
    state?: string;
    scope?: string;
  };
}
