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
import { Link } from 'react-router-dom';
import { PATH } from '@src/constants/path';
import CustomToast from '@src/components/common/toast/customToast';

export default function AboutPage() {
  return (
    <div className="pb-20 mt-[1.875rem] px-4 lg:px-[7.5rem] select-none relative z-[1]">
      {/* 첫 번째 섹션 */}
      <section className="relative flex flex-col justify-start pl-8 lg:pl-16 lg:justify-center h-full pb-20 lg:pb-0 lg:min-h-[43.75rem] bg-blue-light01 rounded-3xl">
        <h1 className="z-50 mt-24 mb-5 text-title lg:text-logo text-tertiary">
          모두가 편하게
          <br />
          만날 수 있는 지름길, 싱크스팟!
        </h1>
        <div className="z-50 flex flex-col gap-4 font-semibold text-content lg:text-menu text-gray-dark">
          <p>
            친구와의 약속을 편하게 만들기 위해 시작된 서비스가
            <br />더 많은 사람들을 위한 모두의 서비스가 됩니다.
          </p>
          <p>
            모임의 장소와 시간을 정하는
            <br />
            당신의 마음이 편안해지고 있습니다.
          </p>
        </div>
        <img
          src={IconAboutSpot}
          alt="AboutSpot"
          className="hidden lg:block size-[20.625rem] absolute lg:top-0 lg:left-[32%] 2xl:left-[30%] bottom-[25%] left-[5%] ml-[6.25rem]"
        />
        <IconDolphin className="lg:block hidden size-[28.125rem] 2xl:size-[34.275rem] right-[3%] 2xl:right-[5%] absolute -bottom-[10%] animate-customBounce" />
      </section>

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
          <Link
            to="https://www.notion.so/119ec33789248135bbfbc44c41ce3cab?pvs=4"
            className="flex items-center justify-center gap-2 p-4 rounded-lg bg-gray-light hover:bg-gray-light01 hover:bg-gray-200"
          >
            <span>중간 지점을 찾는 원리가 궁금하다면?</span>
            <IconRightHalfArrow className="size-5" />
          </Link>
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

      {/* 다섯 번째 섹션 */}
      <footer className="flex flex-col h-full lg:min-h-[43.75rem] mt-10 lg:mt-32 p-8 lg:p-16 bg-gray-50 rounded-3xl">
        <div className="flex items-center gap-2">
          <IconSmallDolphin className="hidden size-10 lg:size-20 lg:block" />
          <h2 className="text-title lg:text-logo text-tertiary whitespace-nowrap">
            '모락(Morak)'은 이런 팀이에요!
          </h2>
        </div>
        <div className="p-4 my-2 font-semibold rounded-lg lg:mt-4 text-description lg:text-menu text-gray-dark bg-white-default w-fit whitespace-nowrap">
          <span className="font-bold text-primary">MORAK</span>:{' '}
          <span className="text-primary">M</span>
          iddle point <span className="text-primary">O</span>f{' '}
          <span className="text-primary">R</span>outes{' '}
          <span className="text-primary">A</span>nd{' '}
          <span className="text-primary">K</span>nowledge
        </div>
        <div className="text-description lg:text-menu text-gray-dark">
          <p>
            갓 구운 감자에서 피어오르는 김이 연상되는 '모락'이라는 단어를
            아시나요?
          </p>
          <p>
            팀 '모락(Morak)'은 IT 연합 동아리인 '코테이토(Cotato)'에서 만난
            5명으로 결성된 팀이에요!
          </p>
          <p>
            처음엔 프로젝트가 익숙하지 않은 '감자'였던 팀원들은
            '싱크스팟(Syncspot)'과 각종 프로젝트들을 경험하며
          </p>
          <p>어느새 감자에서 모락모락 김이 날 정도로 성장했습니다.</p>
        </div>
        <div className="mt-6 text-description lg:text-menu text-gray-dark">
          <p>
            '싱크스팟(Syncspot)'은 다음과 같은 과정을 거쳐 서비스를
            완성했습니다.
          </p>
          <p>
            2024년 3월 ~ 2024년 8월 |{' '}
            <span className="font-bold tex-content">
              팀 '모락(Morak)' 결성 및 서비스 1차 배포
            </span>
          </p>
          <p>
            2024년 9월 ~ 2025년 2월 |{' '}
            <span className="font-bold tex-content">
              사용자 평가 및 유지 보수
            </span>
          </p>
        </div>
        <div className="mt-6 text-description lg:text-menu text-gray-dark">
          <p className="mb-4">팀 '모락(Morak)'의 구성원은 다음과 같습니다</p>
          <div className="flex flex-wrap items-center gap-1 mb-2">
            <span className="p-1 px-2 rounded-lg bg-primary text-white-default text-description whitespace-nowrap">
              PM, DE
            </span>
            <span className="text-content lg:text-menu">이솔</span>
            <span className="mr-2 lg:mr-4 text-description text-gray-dark lg:mt-[0.125rem]">
              이화여대
            </span>
            <span className="p-1 px-2 rounded-lg bg-primary text-white-default text-description whitespace-nowrap">
              PM
            </span>
            <span className="text-content lg:text-menu">김기림</span>
            <span className="text-description text-gray-dark lg:mt-[0.125rem]">
              이화여대
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <span className="p-1 px-2 rounded-lg bg-primary text-white-default text-description whitespace-nowrap">
              FE-LEAD
            </span>
            <span className="text-content lg:text-menu">김태윤</span>
            <span className="mr-2 lg:mr-4 text-description text-gray-dark lg:mt-[0.125rem]">
              동국대
            </span>
            <span className="p-1 px-2 rounded-lg bg-primary text-white-default text-description whitespace-nowrap">
              FE
            </span>
            <span className="text-content lg:text-menu">채다희</span>
            <span className="mr-2 lg:mr-4 text-description text-gray-dark lg:mt-[0.125rem]">
              가톨릭대
            </span>
            <span className="p-1 px-2 rounded-lg bg-primary text-white-default text-description whitespace-nowrap">
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
        <div className="flex items-center justify-end gap-4 mt-4 lg:gap-6">
          <span
            onClick={() =>
              CustomToast({
                type: 'success',
                message: '준비중인 서비스 입니다',
              })
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
