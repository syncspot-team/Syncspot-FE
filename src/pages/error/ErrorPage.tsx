import Layout from '@src/components/layout/Layout';
import Lottie from 'lottie-react';
import Lottie404 from '@src/assets/lotties/Lottie404.json';
import { PATH } from '@src/constants/path';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CustomToast from '@src/components/common/toast/customToast';
import { TOAST_TYPE } from '@src/types/toastType';
import IconGithub from '@src/assets/icons/IconGithub.svg?react';

interface IErrorPageProps {
  status: string;
  message: string;
  isUnknownError: boolean;
  onRetry: () => void;
}

const ErrorPage = ({
  status,
  message,
  isUnknownError,
  onRetry,
}: IErrorPageProps) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    onRetry();
    if (isUnknownError) {
      localStorage.clear();
    }
    navigate(PATH.ROOT);
  };

  useEffect(() => {
    CustomToast({
      type: TOAST_TYPE.ERROR,
      status,
      message,
    });
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-2 items-center justify-center h-[calc(100dvh-20rem)] mt-16">
        <Lottie animationData={Lottie404} className="size-52 lg:size-96" />
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleHomeClick}
            className="p-2 rounded-md lg:p-3 bg-blue-normal01 text-white-default hover:bg-blue-normal02 text-description lg:text-content"
          >
            홈으로 돌아가기
          </button>
          {!isUnknownError ? (
            <button className="p-2 rounded-md lg:p-3 bg-white-default ring-2 ring-blue-normal01 text-blue-normal01 text-description lg:text-content">
              다시 시도
            </button>
          ) : (
            <Link
              to={'https://github.com/Cotato-Syncspot/Syncspot-FE'}
              className="flex items-center justify-center p-2 rounded-md lg:p-3 bg-white-default ring-2 ring-blue-normal01 text-blue-normal01 hover:bg-gray-light text-description lg:text-content"
            >
              에러 문의하기
            </Link>
          )}
          {!isUnknownError && (
            <Link
              to={'https://github.com/Cotato-Syncspot/Syncspot-FE'}
              className="flex items-center justify-center col-span-2 gap-2 p-2 rounded-md lg:p-3 bg-white-default ring-2 ring-black-default hover:bg-gray-light text-description lg:text-content"
            >
              <span>
                <IconGithub className="size-4 lg:size-5" />
              </span>
              <span>에러 문의하기</span>
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ErrorPage;
