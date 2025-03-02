import { FallbackProps } from 'react-error-boundary';
import { isAxiosError } from 'axios';
import { getErrorData } from '@src/utils/getErrorData';
import ErrorPage from '@src/pages/error/ErrorPage';
import { Navigate } from 'react-router-dom';
import { PATH } from '@src/constants/path';

export const APIErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  if (isAxiosError(error)) {
    const errorData = getErrorData(error);
    if (error.response?.data?.code !== 'A-003' && errorData.status === '401') {
      return <Navigate to={PATH.SIGN_IN} replace />;
    }

    return (
      <ErrorPage
        status={errorData.status}
        message={errorData.message}
        isUnknownError={errorData.status === 'ERROR'}
        onRetry={resetErrorBoundary}
      />
    );
  } else {
    throw error;
  }
};
