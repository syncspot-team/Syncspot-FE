import IconAboutMap from '@assets/icons/IconAboutMap.svg?react';
import IconAboutIphone from '@assets/icons/IconAboutIphone.png';
import IconRightHalfArrow from '@assets/icons/IconRightHalfArrow.svg?react';
import IconMobileMidpoint from '@assets/icons/IconMobileMidpoint.png';
import IconBubbleOne from '@assets/icons/IconBubbleOne.svg?react';
import IconBubbleTwo from '@assets/icons/IconBubbleTwo.svg?react';
import IconAboutSyncspot from '@assets/icons/IconAboutSyncspot.svg?react';
import { CustomToast } from '@shared/ui';

export default function MidpointSection({
  isMobile = false,
}: {
  isMobile: boolean;
}) {
  // 모바일 버전
  if (isMobile) {
    return (
      <div>
        {/* 채팅 스타일 UI */}
        <div className="flex flex-col gap-4">
          <IconBubbleOne />
          <IconBubbleTwo className="ml-auto" />
          <IconAboutSyncspot className="w-full mt-5" />
          <div className="flex flex-col *:text-description">
            <span>'싱크스팟'(Syncspot)은</span>{' '}
            <span>모두의 장소를 입력하면 중간지점을 찾아주며,</span>
            <span>
              더 나아가 만남에 대한 모든 것을 한 번에 끝낼 수 있도록 모임장소와
              시간투표 기능까지 제공합니다.
            </span>
          </div>
        </div>
        {/* 중간지점찾기 소개 */}
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
      </div>
    );
  }

  // 데스크탑 버전 - 중간지점찾기 소개
  return (
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
  );
}
