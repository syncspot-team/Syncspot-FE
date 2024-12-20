import { ErrorBoundary } from 'react-error-boundary';
import { APIErrorFallback } from './APIErrorFallback';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

export const APIErrorBoundary = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={APIErrorFallback} onReset={reset}>
      {children}
    </ErrorBoundary>
  );
};
