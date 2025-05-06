import * as Sentry from '@sentry/react';
import { PropsWithChildren } from 'react';
import UnknownErrorFallback from './UnknownErrorFallback';

export const SentryErrorBoundary = ({ children }: PropsWithChildren) => {
  return (
    <Sentry.ErrorBoundary fallback={() => <UnknownErrorFallback />}>
      {children}
    </Sentry.ErrorBoundary>
  );
};
