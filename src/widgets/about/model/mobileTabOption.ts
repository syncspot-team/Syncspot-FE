export const MOBILE_TAB_OPTIONS = {
  SERVICE: 'service',
  TEAM: 'team',
} as const;

export type MobileTabOption =
  (typeof MOBILE_TAB_OPTIONS)[keyof typeof MOBILE_TAB_OPTIONS];
