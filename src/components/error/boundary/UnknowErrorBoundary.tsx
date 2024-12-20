import { ErrorBoundary } from 'react-error-boundary';
import { UnknowErrorFallback } from './UnknowErrorFallback';

export const UnknowErrorBoundary = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ErrorBoundary FallbackComponent={UnknowErrorFallback}>
      {children}
    </ErrorBoundary>
  );
};
