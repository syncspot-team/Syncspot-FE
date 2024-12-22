import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './routes/AppRouter';
import { ToastContainer } from 'react-toastify';
import { getErrorData } from './utils/getErrorData';
import { TOAST_TYPE } from './types/toastType';
import CustomToast from './components/common/toast/customToast';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      throwOnError: true,
    },
    mutations: {
      onError: (error: any) => {
        const errorData = getErrorData(error);
        CustomToast({
          type: TOAST_TYPE.ERROR,
          status: errorData.status,
          message: errorData.message,
        });
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
      <ToastContainer limit={1} />
    </>
  );
}

export default App;
