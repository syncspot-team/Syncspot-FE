import useInAppBrowserDetect from '@src/hooks/useInAppBrowserDetect';
import { ReactNode, useEffect } from 'react';

interface InAppBrowserDetectProps {
  children: ReactNode;
}

const InAppBrowserDetect = ({ children }: InAppBrowserDetectProps) => {
  const {
    isInAppBrowser,
    browserName,
    moveToExternalBrowser,
    moveToStore,
    isAndroid,
    isIOS,
  } = useInAppBrowserDetect();

  useEffect(() => {
    if (isInAppBrowser) moveToExternalBrowser();
  }, [isInAppBrowser, moveToExternalBrowser]);

  if (isInAppBrowser) {
    const getBrowserName = () => {
      switch (browserName) {
        case 'kakaotalk':
          return '카카오톡';
        case 'naver':
          return '네이버';
        case 'facebook':
          return '페이스북';
        case 'instagram':
          return '인스타그램';
        case 'line':
          return '라인';
        default:
          return '현재 사용중인';
      }
    };

    const getStoreText = () => {
      if (isAndroid) return '구글 플레이';
      if (isIOS) return '앱 스토어';
      return '스토어';
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white p-4 text-center">
        <div>
          <p className="mb-2 text-lg font-bold">
            {getBrowserName()} 인앱브라우저에서는
          </p>
          <p className="text-lg">일부 기능 이용이 제한됩니다.</p>
          <p className="mt-4 text-sm text-gray-600">
            외부 브라우저로 이동중입니다...
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              moveToStore();
            }}
            className="mt-6 rounded-lg bg-green-500 px-6 py-2 text-white hover:bg-green-600 active:bg-green-700"
          >
            네이버 앱 {getStoreText()}에서 설치하기
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default InAppBrowserDetect;
