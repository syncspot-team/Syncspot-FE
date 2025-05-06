import * as Sentry from '@sentry/react';

// 사용자 정보 타입 정의
interface SentryUserInfo {
  id?: string;
  email?: string;
  username?: string;
  [key: string]: string | number | boolean | null | undefined;
}

// 컨텍스트 값 타입 정의
type ContextValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<unknown>
  | Record<string, unknown>;

/**
 * 로그인한 사용자 정보를 Sentry에 추가합니다.
 * 이렇게 하면 Sentry에서 어떤 사용자가 에러를 경험했는지 확인할 수 있습니다.
 */
export const setSentryUser = (user: SentryUserInfo | null) => {
  if (user) {
    // 사용자가 로그인했을 때
    Sentry.setUser({
      id: user.id,
      email: user.email,
      username: user.username,
    });
  } else {
    // 사용자가 로그아웃했을 때
    Sentry.setUser(null);
  }
};

/**
 * 현재 페이지 또는 작업에 대한 컨텍스트를 Sentry에 추가합니다.
 * 이렇게 하면 에러가 발생했을 때 어떤 작업을 수행하고 있었는지 파악하기 쉽습니다.
 */
export const setSentryContext = (
  name: string,
  context: Record<string, ContextValue>,
) => {
  Sentry.setContext(name, context);
};

/**
 * 현재 작업에 대한 태그를 Sentry에 추가합니다.
 * 태그는 에러를 필터링하고 그룹화하는 데 유용합니다.
 */
export const setSentryTag = (key: string, value: string) => {
  Sentry.setTag(key, value);
};
