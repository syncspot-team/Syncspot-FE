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
 *
 * @param user 사용자 정보
 * @param includePersonalInfo 이메일 등 개인정보 포함 여부 (사용자 동의 필요)
 */
export const setSentryUser = (
  user: SentryUserInfo | null,
  includePersonalInfo: boolean = false,
) => {
  // Sentry가 활성화되지 않은 경우 종료
  if (
    !import.meta.env.PROD ||
    localStorage.getItem('errorTrackingConsent') !== 'true'
  ) {
    return;
  }

  if (user) {
    if (includePersonalInfo) {
      // 사용자가 개인정보 수집에 동의한 경우 - 전체 정보 포함
      Sentry.setUser({
        id: user.id,
        email: user.email,
        username: user.username,
      });
    } else {
      // 개인정보 수집 미동의 - 최소한의 정보만 포함 (익명화된 ID)
      Sentry.setUser({
        id: user.id ? `user-${hashId(user.id)}` : undefined,
        // 이메일과 실명 등 개인정보 제외
      });
    }
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

// 사용자 ID를 익명화하기 위한 간단한 해시 함수
const hashId = (id: string): string => {
  // 실제로는 더 강력한 해시 알고리즘 사용 권장
  return btoa(`${id}-${import.meta.env.VITE_HASH_SALT || 'salt'}`).slice(0, 8);
};
