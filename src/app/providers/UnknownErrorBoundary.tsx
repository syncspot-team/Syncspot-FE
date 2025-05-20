import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { UnknownErrorFallback } from '@src/app/providers';

export default function UnknownErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={UnknownErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
