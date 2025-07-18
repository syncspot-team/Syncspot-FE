import * as Sentry from '@sentry/react';

export const initSentry = () => {
  // 사용자의 에러 추적 동의 여부 확인 (localStorage 또는 상태 관리 도구에서 가져옴)
  const hasUserConsent =
    localStorage.getItem('errorTrackingConsent') === 'true';

  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,

    enabled: import.meta.env.PROD && hasUserConsent, // 프로덕션 환경 + 사용자 동의 시에만 활성화

    sendDefaultPii: false, // 개인식별정보 자동 수집 비활성화

    integrations: [
      Sentry.browserTracingIntegration(),

      Sentry.replayIntegration(),
    ],

    tracesSampleRate: 0.5,

    tracePropagationTargets: [
      /^\//,
      /^https:\/\/www\.api\.syncspot\.kr/,
      /^https:\/\/www\.dev\.syncspot\.kr/,
    ],

    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    environment: import.meta.env.MODE,
  });
};

// 사용자의 에러 추적 동의 설정 함수
export const setErrorTrackingConsent = (consent: boolean) => {
  localStorage.setItem('errorTrackingConsent', consent ? 'true' : 'false');

  // 동의 변경 시 Sentry 재초기화
  if (consent) {
    initSentry();
  } else {
    // 동의 철회 시 Sentry 비활성화 (현재 세션)
    Sentry.close();
  }
};

export const sentryReactErrorHandler = Sentry.reactErrorHandler;
