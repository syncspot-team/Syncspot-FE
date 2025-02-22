import { ErrorBoundary } from 'react-error-boundary';
import UnknownErrorFallback from './UnknownErrorFallback';

export const UnknownErrorBoundary = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ErrorBoundary FallbackComponent={UnknownErrorFallback}>
      {children}
    </ErrorBoundary>
  );
};
