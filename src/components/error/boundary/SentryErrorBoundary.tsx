import * as Sentry from '@sentry/react';
import { PropsWithChildren } from 'react';
import UnknownErrorFallback from './UnknownErrorFallback';

// Sentry 보고 플래그가 추가된 에러 인터페이스
interface SentryReportedError extends Error {
  _sentryReported?: boolean;
}

export const SentryErrorBoundary = ({ children }: PropsWithChildren) => {
  return (
    <Sentry.ErrorBoundary
      fallback={() => <UnknownErrorFallback />}
      beforeCapture={(scope, error) => {
        // 이미 Sentry에 보고된 에러인지 확인
        const reportedError = error as SentryReportedError;
        if (reportedError._sentryReported) {
          // 이미 보고된 에러면 중복 보고 방지
          scope.clear();
        }
      }}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
};
