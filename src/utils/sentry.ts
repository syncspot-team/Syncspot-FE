import * as Sentry from '@sentry/react';

export const initSentry = () => {
  Sentry.init({
    // 여기에 실제 Sentry DSN을 입력하세요
    dsn: import.meta.env.VITE_SENTRY_DSN,

    // 개발 환경에서만 에러 보고 활성화 (선택적)
    enabled: import.meta.env.PROD,

    // 기본 PII 정보 전송 활성화 (사용자 식별을 위한 헤더 및 IP)
    sendDefaultPii: true,

    integrations: [
      // 브라우저 트레이싱 통합
      Sentry.browserTracingIntegration(),

      // 세션 리플레이 통합 (선택적)
      Sentry.replayIntegration(),
    ],

    // 트레이스 샘플링 비율 설정 (0.0 ~ 1.0)
    tracesSampleRate: 0.5,

    // 요청 추적 대상 URL 패턴
    tracePropagationTargets: [
      /^\//,
      /^https:\/\/www\.api\.syncspot\.kr/,
      /^https:\/\/www\.dev\.syncspot\.kr/,
    ],

    // 세션 리플레이 설정 (선택적)
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    // 환경 설정 (개발/테스트/프로덕션)
    environment: import.meta.env.MODE,
  });
};

export const sentryReactErrorHandler = Sentry.reactErrorHandler;
