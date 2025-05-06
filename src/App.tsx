import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './routes/AppRouter';
import { ToastContainer } from 'react-toastify';
import { getErrorData } from './utils/getErrorData';
import { TOAST_TYPE } from './types/toastType';
import CustomToast from './components/common/toast/customToast';
import 'react-toastify/dist/ReactToastify.css';
import { captureApiError } from './utils/sentryCapture';
import { isAxiosError } from 'axios';
import { captureException } from './utils/sentryCapture';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      throwOnError: true,
    },
    mutations: {
      onError: (error: unknown) => {
        if (isAxiosError(error)) {
          // Axios 에러인 경우 - API 에러로 처리
          const errorData = getErrorData(error);

          // Sentry에 API 에러 기록
          captureApiError(error.config?.url || 'unknown', error);

          // 사용자에게 오류 알림 표시
          CustomToast({
            type: TOAST_TYPE.ERROR,
            status: errorData.status,
            message: errorData.message,
          });
        } else if (error instanceof Error) {
          // 일반 자바스크립트 Error인 경우
          captureException(error);

          CustomToast({
            type: TOAST_TYPE.ERROR,
            status: 'error',
            message: error.message || '알 수 없는 오류가 발생했습니다.',
          });
        } else {
          // 기타 알 수 없는 에러 타입
          captureException(new Error('Unknown error occurred'));

          CustomToast({
            type: TOAST_TYPE.ERROR,
            status: 'error',
            message: '알 수 없는 오류가 발생했습니다.',
          });
        }
      },
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
      <ToastContainer
        limit={1}
        style={{
          top: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'auto',
          maxWidth: '90vw',
        }}
      />
    </>
  );
}

export default App;
