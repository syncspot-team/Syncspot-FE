import IconAboutTimeVote from '@assets/icons/IconAboutTimeVote.png';
import IconRightHalfArrow from '@assets/icons/IconRightHalfArrow.svg?react';
import IconAboutTimeVoteMobile from '@assets/icons/IconMobileTimeVote.svg?react';
import { Link } from 'react-router-dom';
import { PATH } from '@shared/constants';

export default function TimeVoteSection({
  isMobile = false,
}: {
  isMobile: boolean;
}) {
  // 모바일 버전
  if (isMobile) {
    return (
      <div className="py-5 pb-8">
        <h3 className="text-menu-selected text-primary">
          우리가 만나기까지 세 번째 걸음,
        </h3>
        <h3 className="mb-4 text-menu-selected text-primary">시간 투표하기</h3>
        <IconAboutTimeVoteMobile className="w-full mb-4" />
        <h3 className="text-description">
          약속에 관한 모든 것들을 싱크스팟에서 정할 수 있도록
        </h3>
        <h3 className="text-description">만날 시간을 투표로 정합니다.</h3>
      </div>
    );
  }

  // 데스크탑 버전
  return (
    <section className="ring-1 ring-blue-normal01 rounded-3xl lg:ring-0 relative flex justify-start lg:justify-end items-start pl-8 lg:pr-16 mt-10 lg:mt-32 pb-20 lg:pb-0 h-full lg:min-h-[43.75rem]">
      <img
        src={IconAboutTimeVote}
        alt="IconAboutTimeVote"
        className="hidden lg:block w-[37.5rem] 2xl:w-[40.625rem] h-[31.25rem] 2xl:h-[34.375rem] absolute top-[15%] left-0 object-cover"
      />
      <div className="z-50 flex flex-col gap-2 mt-16 font-semibold lg:gap-4 lg:-mr-10 2xl:mr-10 text-content lg:text-menu text-gray-dark lg:mt-40 2xl:mt-48">
        <h2 className="z-50 flex flex-col gap-1 mb-10 text-title lg:text-logo text-tertiary">
          <span>약속을 완벽하게 정하도록</span>
          <span>만날 시간 투표</span>
        </h2>
        <p className="mb-10 font-semibold text-gray-dark text-content lg:text-menu">
          약속에 관한 모든 건 싱크스팟을 통해 정할 수 있도록
          <br />
          만날 시간을 투표로 정합니다.
        </p>
        <Link
          to={PATH.ONBOARDING}
          className="flex items-center justify-center gap-2 p-4 rounded-lg bg-gray-light hover:bg-gray-light01 hover:bg-gray-200"
        >
          <span>우리의 모임 시간 정하기</span>
          <IconRightHalfArrow className="size-5" />
        </Link>
      </div>
    </section>
  );
}
