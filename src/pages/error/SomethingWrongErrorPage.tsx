import Lottie404 from '@src/assets/lotties/Lottie404.json';
import { PATH } from '@src/constants/path';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import IconGithub from '@src/assets/icons/IconGithub.png';

export default function SomethingWrongErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100dvh-20rem)] mt-14">
      <Lottie animationData={Lottie404} className="size-52 lg:size-96" />
      <div className="grid grid-cols-2 gap-2 lg:-mt-5">
        <Link
          to={PATH.ROOT}
          className="flex items-center justify-center gap-2 p-2 rounded-md lg:p-3 bg-blue-normal01 ring-2 ring-blue-normal01 hover:ring-blue-normal02 text-white-default hover:bg-blue-normal02 text-description lg:text-content"
        >
          홈으로 돌아가기
        </Link>
        <Link
          to={'https://github.com/Cotato-Syncspot/Syncspot-FE'}
          className="flex items-center justify-center gap-2 p-2 rounded-md lg:p-3 bg-black-default text-white-default ring-2 ring-black-default hover:opacity-80 text-description lg:text-content"
        >
          <img
            src={IconGithub}
            alt="github"
            className="size-5 lg:size-6 -mt-[1px]"
          />
          <span>에러 문의하기</span>
        </Link>
      </div>
    </div>
  );
}
