import * as Sentry from '@sentry/react';
import { AxiosError } from 'axios';

// API 에러 응답을 위한 인터페이스 정의
interface ApiErrorResponse {
  status?: number;
  statusText?: string;
  response?: {
    data?: unknown;
    headers?: Record<string, string | string[] | undefined>;
    [key: string]: unknown;
  };
  config?: {
    url?: string;
    method?: string;
    [key: string]: unknown;
  };
  message?: string;
  [key: string]: unknown;
}

// 컨텍스트 타입 정의
type ContextValue = string | number | boolean | null | undefined | object;

/**
 * 예외를 Sentry에 수동으로 캡처합니다.
 */
export const captureException = (
  error: Error | string,
  context?: Record<string, ContextValue>,
) => {
  if (typeof error === 'string') {
    // 문자열이 전달된 경우 Error 객체로 변환
    error = new Error(error);
  }

  if (context) {
    // 컨텍스트가 있는 경우 범위에 추가
    Sentry.withScope((scope) => {
      Object.entries(context).forEach(([key, value]) => {
        scope.setExtra(key, value);
      });
      Sentry.captureException(error);
    });
  } else {
    Sentry.captureException(error);
  }
};

/**
 * 이벤트를 Sentry에 수동으로 캡처합니다.
 * 에러가 아닌 중요한 이벤트나 로그를 추적할 때 유용합니다.
 */
export const captureMessage = (
  message: string,
  level?: Sentry.SeverityLevel,
) => {
  Sentry.captureMessage(message, level);
};

/**
 * API 에러 응답을 Sentry에 캡처합니다.
 */
export const captureApiError = (
  endpoint: string,
  error: ApiErrorResponse | AxiosError,
) => {
  const context: Record<string, unknown> = {
    endpoint,
  };

  // AxiosError와 일반 ApiErrorResponse 처리 분기
  if (error instanceof AxiosError) {
    context.status = error.response?.status || 'unknown';
    context.statusText = error.response?.statusText || 'unknown';
    context.response = error.response?.data || {};
    context.config = error.config || {};
  } else {
    context.status = error.status || 'unknown';
    context.statusText = error.statusText || 'unknown';
    context.response = error.response || {};
    context.config = error.config || {};
  }

  Sentry.withScope((scope) => {
    scope.setLevel('error');
    scope.setFingerprint([`api-error-${endpoint}`]);
    scope.setContext('API Error', context);
    Sentry.captureException(error);
  });
};
