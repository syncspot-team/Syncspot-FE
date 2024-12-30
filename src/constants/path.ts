export type ROUTE_TYPE = 'PRIVATE' | 'PUBLIC';

export const PATH = {
  ROOT: '/',
  SIGN_IN: '/sign_in',
  SIGN_UP: '/sign_up',
  MY_PAGE: '/mypage',
} as const;
