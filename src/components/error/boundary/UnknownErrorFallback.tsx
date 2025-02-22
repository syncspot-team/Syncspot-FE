import Layout from '@src/components/layout/Layout';
import Lottie from 'lottie-react';
import Lottie404 from '@src/assets/lotties/Lottie404.json';
import { PATH } from '@src/constants/path';
import { Link, useNavigate } from 'react-router-dom';

export default function UnknownErrorFallback() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    localStorage.clear();
    navigate(PATH.ROOT);
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center justify-center h-[calc(100dvh-20rem)] mt-16">
          <Lottie animationData={Lottie404} className="size-52 lg:size-96" />
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={handleGoHome}
              className="p-2 rounded-md lg:p-3 bg-blue-normal01 text-white-default hover:bg-blue-normal02 text-description lg:text-content"
            >
              홈으로 돌아가기
            </button>
            <Link
              to={'https://github.com/Cotato-Syncspot/Syncspot-FE'}
              className="p-2 rounded-md lg:p-3 bg-white-default ring-2 ring-blue-normal01 text-blue-normal01 hover:bg-gray-light text-description lg:text-content"
            >
              에러 문의하기
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
