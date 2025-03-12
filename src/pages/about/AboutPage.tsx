import IconDolphin from '@src/assets/icons/IconDolphin.svg?react';
import IconAboutMap from '@src/assets/icons/IconAboutMap.svg?react';
import IconAboutPlaceSearch from '@src/assets/icons/IconAboutPlaceSearch.png';
import IconAboutIphone from '@src/assets/icons/IconAboutIphone.png';
import IconAboutSpot from '@src/assets/icons/IconAboutSpot.png';
import IconAboutTimeVote from '@src/assets/icons/IconAboutTimeVote.png';
import IconAboutInstagram from '@src/assets/icons/IconAboutInstagram.svg?react';
import IconGithub from '@src/assets/icons/IconGithub.svg?react';
import IconRightHalfArrow from '@src/assets/icons/IconRightHalfArrow.svg?react';
import IconSmallDolphin from '@src/assets/icons/IconSmallDolphin.svg?react';
import IconBubbleOne from '@src/assets/icons/IconBubbleOne.svg?react';
import IconBubbleTwo from '@src/assets/icons/IconBubbleTwo.svg?react';
import IconAboutSyncspot from '@src/assets/icons/IconAboutSyncspot.svg?react';
import IconMobileMidpoint from '@src/assets/icons/IconMobileMidpoint.png';
import IconAboutPlaceVote from '@src/assets/icons/IconMobilePlaceVote.svg?react';
import IconAboutTimeVoteMobile from '@src/assets/icons/IconMobileTimeVote.svg?react';
import { Link } from 'react-router-dom';
import { PATH } from '@src/constants/path';
import CustomToast from '@src/components/common/toast/customToast';
import { useState } from 'react';

const MOBILE_TAB_OPTIONS = {
  SERVICE: 'service',
  TEAM: 'team',
} as const;

type MobileTabOption =
  (typeof MOBILE_TAB_OPTIONS)[keyof typeof MOBILE_TAB_OPTIONS];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<MobileTabOption>(
    MOBILE_TAB_OPTIONS.SERVICE,
  );

  return (
    <div className="pb-20 mt-[1.875rem] px-4 lg:px-[7.5rem] select-none relative z-[1]">
      {/* 첫 번째 섹션 */}
      <section
        className="relative flex flex-col justify-start px-4 lg:pl-16 lg:justify-center h-full pb-10
       lg:pb-0 lg:min-h-[43.75rem] bg-blue-light01 rounded-3xl"
      >
        <h1 className="z-50 mt-6 mb-5 lg:mt-24 text-subtitle lg:text-logo text-tertiary">
          모두가 편하게
          <br />
          만날 수 있는 지름길, 싱크스팟!
        </h1>
        <div className="z-50 flex flex-col gap-2 font-semibold text-content lg:text-menu text-gray-dark">
          <p className="lg:flex lg:flex-col lg:gap-1">
            <span>친구와의 약속을 편하게 만들기 위해 시작된 서비스가</span>
            <span> 더 많은 사람들을 위한 모두의 서비스가 됩니다.</span>
          </p>
          <p className="lg:flex lg:flex-col lg:gap-1">
            <span>모임의 장소와 시간을 정하는</span>
            <span>당신의 마음이 편안해지고 있습니다.</span>
          </p>
        </div>
        <img
          src={IconAboutSpot}
          alt="AboutSpot"
          className="size-[100px] lg:size-[20.625rem] 
          absolute lg:top-0 lg:left-[32%] 2xl:left-[30%] 
          right-44 bottom-[25%] lg:bottom-auto
          lg:ml-[6.25rem]"
        />
        <IconDolphin
          className="size-[9.375rem] lg:size-[28.125rem] 2xl:size-[34.275rem] 
          right-[3%] 2xl:right-[5%] 
          relative lg:absolute 
          -bottom-[10%]
          ml-auto mt-10 lg:mt-0
          lg:animate-customBounce"
        />
      </section>

      {/* 모바일 네비게이션 탭 */}
      <div className="flex justify-around px-5 my-4 border-b text-description lg:hidden border-gray-normal">
        <button
          className={`px-4 py-2 rounded-lg font-semibold mb-2 ${
            activeTab === MOBILE_TAB_OPTIONS.SERVICE
              ? 'text-white-default bg-primary'
              : 'text-gray-dark'
          }`}
          onClick={() => setActiveTab(MOBILE_TAB_OPTIONS.SERVICE)}
        >
          서비스 소개
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold mb-2 ${
            activeTab === MOBILE_TAB_OPTIONS.TEAM
              ? 'text-white-default bg-primary'
              : 'text-gray-dark'
          }`}
          onClick={() => setActiveTab(MOBILE_TAB_OPTIONS.TEAM)}
        >
          팀 모락모락
        </button>
      </div>

      {/* 모바일 서비스 소개 컨텐츠 */}
      {activeTab === MOBILE_TAB_OPTIONS.SERVICE && (
        <div className="lg:hidden">
          {/* 첫 번째 섹션 - 채팅 스타일 UI */}
          <div className="flex flex-col gap-4">
            <IconBubbleOne />
            <IconBubbleTwo className="ml-auto" />
            <IconAboutSyncspot className="w-full mt-5" />
            <div className="flex flex-col *:text-description">
              <span>'싱크스팟'(Syncspot)은</span>{' '}
              <span>모두의 장소를 입력하면 중간지점을 찾아주며,</span>
              <span>
                더 나아가 만남에 대한 모든 것을 한 번에 끝낼 수 있도록
                모임장소와 시간투표 기능까지 제공합니다.
              </span>
            </div>
          </div>

          {/* 기존 서비스 소개 카드들 */}
          <div className="py-6 mt-4 border-t border-b border-primary">
            <h3 className="text-menu-selected text-primary">
              우리가 만나기까지 첫 번째 걸음,
            </h3>
            <h3 className="mb-4 text-menu-selected text-primary">
              중간 지점 찾기
            </h3>
            <img
              src={IconMobileMidpoint}
              alt="IconMobileMidpoint"
              className="w-full mb-4"
            />
            <h3 className="text-description">
              한국이라면 어디든 유동인구가 많은 지역을 골라
            </h3>
            <h3 className="text-description">
              공평한 우리의 중간지점을 찾아줍니다.
            </h3>
          </div>

          <div className="pb-5 mt-5 border-b border-primary">
            <h3 className="text-menu-selected text-primary">
              우리가 만나기까지 두 번째 걸음,
            </h3>
            <h3 className="mb-4 text-menu-selected text-primary">
              장소 투표하기
            </h3>
            <IconAboutPlaceVote className="w-full mb-4" />
            <h3 className="text-description">
              직전에 찾은 5개의 장소들을 포함하여
            </h3>
            <h3 className="text-description">
              내가 원하는 장소들을 투표합니다.
            </h3>
          </div>

          <div className="py-5 pb-8">
            <h3 className="text-menu-selected text-primary">
              우리가 만나기까지 세 번째 걸음,
            </h3>
            <h3 className="mb-4 text-menu-selected text-primary">
              시간 투표하기
            </h3>
            <IconAboutTimeVoteMobile className="w-full mb-4" />
            <h3 className="text-description">
              약속에 관한 모든 것들을 싱크스팟에서 정할 수 있도록
            </h3>
            <h3 className="text-description">만날 시간을 투표로 정합니다.</h3>
          </div>
        </div>
      )}

      {/* 데스크탑 UI - 기존 섹션들 */}
      <div className="hidden lg:block">
        {/* 두 번째 섹션 */}
        <section className="ring-1 ring-blue-normal01 rounded-3xl lg:ring-0 relative flex justify-start lg:justify-end items-start pl-8 lg:pr-16 mt-10 lg:mt-32 pb-20 lg:pb-0 h-full lg:min-h-[43.75rem]">
          <img
            src={IconAboutIphone}
            alt="IconAboutIphone"
            className="hidden lg:block w-[25rem] 2xl:[28.125rem] h-[40.625rem] 2xl:h-[43.75rem] absolute top-[5%] 2xl:top-0 left-[2%] 2xl:left-[5%] object-cover"
          />
          <IconAboutMap className="hidden lg:block size-[12.5rem] absolute top-0 left-[35%] 2xl:left-[30%] 2xl:size-[15rem]" />
          <div className="z-50 flex flex-col gap-2 mt-16 font-semibold lg:gap-4 lg:-mr-10 2xl:mr-10 text-content lg:text-menu text-gray-dark lg:mt-40 2xl:mt-48">
            <h2 className="z-50 flex flex-col gap-1 mb-5 text-title lg:text-logo text-tertiary">
              <span>누구에게나 공평한</span>
              <span>중간 지점 찾기</span>
            </h2>
            <p className="mb-10 font-semibold text-gray-dark text-content lg:text-menu">
              한국어라면 어디든 유동 인구가 많은 지역을 골라
              <br />
              공평한 우리의 중간 지점을 찾아줍니다.
            </p>
            <button
              onClick={() =>
                CustomToast({
                  type: 'success',
                  message: '준비중인 서비스 입니다',
                })
              }
              className="flex items-center justify-center gap-2 p-4 rounded-lg bg-gray-light hover:bg-gray-light01 hover:bg-gray-200"
            >
              <span>중간 지점을 찾는 원리가 궁금하다면?</span>
              <IconRightHalfArrow className="size-5" />
            </button>
          </div>
        </section>

        {/* 세 번째 섹션 */}
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
            className="hidden lg:block w-[37.5rem] 2xl:w-[40.625rem] h-[31.25rem] 2xl:h-[34.375rem] absolute top-[10%]  right-0 object-cover"
          />
        </section>

        {/* 네 번째 섹션 */}
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
      </div>

      {/* 푸터 섹션 - 데스크탑에서는 항상 보이고, 모바일에서는 팀 모락모락 탭일 때만 보이도록 */}
      <footer
        className={`${activeTab === MOBILE_TAB_OPTIONS.TEAM ? 'block lg:block' : 'hidden lg:block'} flex flex-col h-full lg:min-h-[43.75rem] mt-6 lg:mt-32 p-8 lg:p-16 bg-gray-50 rounded-3xl`}
      >
        <div className="flex items-center gap-2">
          <IconSmallDolphin className="hidden size-10 lg:size-20 lg:block" />
          <h2 className="text-subtitle lg:text-logo text-tertiary whitespace-nowrap">
            '모락(Morak)'은 이런 팀이에요!
          </h2>
        </div>
        <div className="w-full p-4 my-2 font-semibold rounded-lg lg:mt-4 text-description lg:text-menu text-gray-dark bg-white-default">
          <span className="font-bold text-primary">MORAK</span>:{' '}
          <span className="text-primary">M</span>
          iddle point <span className="text-primary">O</span>f{' '}
          <span className="text-primary">R</span>outes{' '}
          <span className="text-primary">A</span>nd{' '}
          <span className="text-primary">K</span>nowledge
        </div>
        <div className="flex-col gap-2 pb-4 border-b-2 lg:flex text-description lg:text-menu text-gray-dark border-primary lg:border-none">
          <span>
            갓 구운 감자에서 피어오르는 김이 연상되는 '모락'이라는 단어를
            아시나요?
          </span>
          <span>
            팀 '모락(Morak)'은 IT 연합 동아리인 '코테이토(Cotato)'에서 만난
            5명으로 결성된 팀이에요!
          </span>
          <span>
            처음엔 프로젝트가 익숙하지 않은 '감자'였던 팀원들은
            '싱크스팟(Syncspot)'과 각종 프로젝트들을 경험하며 어느새 감자에서
            모락모락 김이 날 정도로 성장했습니다.
          </span>
        </div>
        <div className="pb-4 mt-6 border-b-2 text-description lg:text-menu text-gray-dark border-primary lg:border-none">
          <span>
            <span className="text-primary">싱크스팟(Syncspot)</span>은 다음과
            같은 과정을 거쳐 서비스를 완성했습니다.
          </span>
          <p>
            <span className="text-primary">2024년 3월 ~ 2024년 8월 </span> |{' '}
            <span className="font-bold tex-content">
              팀 '모락(Morak)' 결성 및 서비스 1차 배포
            </span>
          </p>
          <p>
            <span className="text-primary">2024년 9월 ~ 2025년 2월 </span> |{' '}
            <span className="font-bold tex-content">
              사용자 평가 및 유지 보수
            </span>
          </p>
        </div>
        <div className="pb-4 mt-6 border-b-2 text-description lg:text-menu text-gray-dark border-primary lg:border-none">
          <p className="mb-4">팀 '모락(Morak)'의 구성원은 다음과 같습니다</p>
          <div className="flex flex-wrap items-center gap-1 mb-2">
            <span className="p-1 rounded-lg lg:p-1 lg:px-2 bg-primary text-white-default text-[0.625rem] whitespace-nowrap">
              PM, DE
            </span>
            <span className="text-content lg:text-menu">이솔</span>
            <span className="mr-2 lg:mr-4 text-description text-gray-dark lg:mt-[0.125rem]">
              이화여대
            </span>
            <span className="p-1 rounded-lg lg:p-1 lg:px-2 bg-primary text-white-default text-[0.625rem] whitespace-nowrap">
              PM
            </span>
            <span className="text-content lg:text-menu">김기림</span>
            <span className="text-description text-gray-dark lg:mt-[0.125rem]">
              이화여대
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <span className="p-1 rounded-lg lg:p-1 lg:px-2 bg-primary text-white-default text-[0.625rem] whitespace-nowrap">
              FE-LEAD
            </span>
            <span className="text-content lg:text-menu">김태윤</span>
            <span className="mr-2 lg:mr-4 text-description text-gray-dark lg:mt-[0.125rem]">
              동국대
            </span>
            <span className="p-1 rounded-lg lg:p-1 lg:px-2 bg-primary text-white-default text-[0.625rem] whitespace-nowrap">
              FE
            </span>
            <span className="text-content lg:text-menu">채다희</span>
            <span className="mr-2 lg:mr-4 text-description text-gray-dark lg:mt-[0.125rem]">
              가톨릭대
            </span>
            <span className="p-1 rounded-lg lg:p-1 lg:px-2 bg-primary text-white-default text-[0.625rem] whitespace-nowrap">
              BE-LEAD
            </span>
            <span className="text-content lg:text-menu">윤찬호</span>
            <span className="mr-2 lg:mr-4 text-description text-gray-dark lg:mt-[0.125rem]">
              홍익대
            </span>
          </div>
        </div>
        <div className="mt-6 text-description lg:text-menu text-gray-dark">
          <p>
            발전하는 팀 '모락(Morak)'의 소식은 인스타그램(@syncspot_official)과
            깃허브에서 확인할 수 있습니다!
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4 lg:justify-end lg:gap-6">
          <span
            onClick={() =>
              (window.location.href =
                'https://www.instagram.com/syncspot_official?igsh=MWp5MjdzaHNtc2xsMg%3D%3D&utm_source=qr')
            }
            className="p-2 lg:p-4 rounded-full shadow-lg bg-white-default cursor-pointer hover:translate-y-[-0.25rem]"
          >
            <IconAboutInstagram className="size-8 lg:size-10 lg:block" />
          </span>
          <span
            onClick={() =>
              (window.location.href = 'https://github.com/Cotato-Syncspot')
            }
            className="p-2 lg:p-4 rounded-full shadow-lg bg-white-default cursor-pointer hover:translate-y-[-0.25rem]"
          >
            <IconGithub className="size-8 lg:size-10 lg:block" />
          </span>
        </div>
      </footer>
    </div>
  );
}
