import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { APIErrorFallback } from '@src/app/providers';

export default function APIErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={APIErrorFallback} onReset={reset}>
      {children}
    </ErrorBoundary>
  );
}
