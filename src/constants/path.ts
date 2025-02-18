export type ROUTE_TYPE = 'PRIVATE' | 'PUBLIC';

export const PATH = {
  ROOT: '/',
  SIGN_IN: '/sign_in',
  SIGN_UP: '/sign_up',
  HELP_ID_INQUIRY: '/help/idInquiry',
  HELP_PASSWORD_INQUIRY: '/help/pwInquiry',
  ONBOARDING: '/onboarding',
  LOCATION_ENTER: (roomId?: string) => `/location/enter/${roomId ?? ':roomId'}`,
  LOCATION_RESULT: (roomId?: string) =>
    `/location/result/${roomId ?? ':roomId'}`,
  LOCATION_RECOMMENDATIONS: (roomId?: string) =>
    `/location/recommendations/${roomId ?? ':roomId'}`,
  PLACE_CREATE: (roomId?: string) => `/place/create/${roomId ?? ':roomId'}`,
  PLACE_VOTE: (roomId?: string) => `/place/vote/${roomId ?? ':roomId'}`,
  PLACE_RESULT: (roomId?: string) => `/place/result/${roomId ?? ':roomId'}`,
  TIME_CREATE: (roomId?: string) => `/time/create/${roomId ?? ':roomId'}`,
  TIME_VOTE: (roomId?: string) => `/time/vote/${roomId ?? ':roomId'}`,
  TIME_RESULT: (roomId?: string) => `/time/result/${roomId ?? ':roomId'}`,
  ABOUT: '/about',
  USERS: '/users',
  USERS_PROFILE: 'profile',
  USERS_GROUP_LISTS: 'group_lists',
  USERS_PASSWORD:'password',
  USERS_LOGOUT: 'logout',
  USERS_QUIT: 'quit',
} as const;
