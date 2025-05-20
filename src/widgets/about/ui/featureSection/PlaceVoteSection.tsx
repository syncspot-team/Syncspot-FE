import IconAboutPlaceSearch from '@src/shared/assets/icons/IconAboutPlaceSearch.png';
import IconRightHalfArrow from '@src/shared/assets/icons/IconRightHalfArrow.svg?react';
import IconAboutPlaceVote from '@src/shared/assets/icons/IconMobilePlaceVote.svg?react';
import { Link } from 'react-router-dom';
import { PATH } from '@src/shared/constants';

export default function PlaceVoteSection({
  isMobile = false,
}: {
  isMobile: boolean;
}) {
  // 모바일 버전
  if (isMobile) {
    return (
      <div className="pb-5 mt-5 border-b border-primary">
        <h3 className="text-menu-selected text-primary">
          우리가 만나기까지 두 번째 걸음,
        </h3>
        <h3 className="mb-4 text-menu-selected text-primary">장소 투표하기</h3>
        <IconAboutPlaceVote className="w-full mb-4" />
        <h3 className="text-description">
          직전에 찾은 5개의 장소들을 포함하여
        </h3>
        <h3 className="text-description">내가 원하는 장소들을 투표합니다.</h3>
      </div>
    );
  }

  // 데스크탑 버전
  return (
    <section className="ring-1 ring-blue-normal01 rounded-3xl lg:ring-0 relative flex justify-start items-start pl-8 lg:pl-16 2xl:pl-40 mt-10 lg:mt-32 pb-20 lg:pb-0 h-full lg:min-h-[43.75rem]">
      <div className="z-50 flex flex-col gap-2 mt-10 font-semibold lg:gap-4 text-content lg:text-menu text-gray-dark lg:mt-40 2xl:mt-48">
        <h2 className="z-50 flex flex-col gap-1 mb-5 text-title lg:text-logo text-tertiary">
          <span>방금 찾은 장소 기반</span>
          <span>만날 장소 투표</span>
        </h2>
        <p className="mb-10 font-semibold text-gray-dark text-content lg:text-menu">
          직전에 찾은 5개의 중간 지점을 포함하여
          <br />
          내가 원하는 장소들을 투표합니다
        </p>
        <Link
          to={PATH.ONBOARDING}
          className="flex items-center justify-center gap-2 p-4 rounded-lg bg-gray-light hover:bg-gray-light01 hover:bg-gray-200"
        >
          <span>이번 주에 만날 장소 정해보기</span>
          <IconRightHalfArrow className="size-5" />
        </Link>
      </div>
      <img
        src={IconAboutPlaceSearch}
        alt="IconAboutPlaceSearch"
        className="hidden lg:block w-[37.5rem] 2xl:w-[40.625rem] h-[31.25rem] 2xl:h-[34.375rem] absolute top-[10%] right-0 object-cover"
      />
    </section>
  );
}
