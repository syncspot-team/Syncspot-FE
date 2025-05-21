import IconAboutInstagram from '@assets/icons/IconAboutInstagram.svg?react';
import IconGithub from '@assets/icons/IconGithub.svg?react';
import IconSmallDolphin from '@assets/icons/IconSmallDolphin.svg?react';
import {
  MOBILE_TAB_OPTIONS,
  MobileTabOption,
  TEAM_MEMBERS,
  SOCIAL_LINKS,
  TeamMember,
  SocialLink,
} from '@widgets/about/model';
import { mergeClassNames } from '@shared/utils';

//entities 분리가능 조건에 해당하지만, api 사용 X 핵심 도메인 기능 X 재사용성 낮음으로 분리하지 않음
function TeamMemberCard({ role, name, school }: TeamMember) {
  return (
    <div className="flex items-center gap-1">
      <span className="p-1 rounded-lg lg:p-1 lg:px-2 bg-primary text-white-default text-[0.625rem] whitespace-nowrap">
        {role}
      </span>
      <span className="text-content lg:text-menu">{name}</span>
      <span className="mr-2 lg:mr-4 text-description text-gray-dark lg:mt-[0.125rem]">
        {school}
      </span>
    </div>
  );
}

function SocialIcon({ url, icon }: SocialLink) {
  const IconComponent =
    icon === 'IconAboutInstagram' ? IconAboutInstagram : IconGithub;

  return (
    <span
      onClick={() => (window.location.href = url)}
      className="p-2 lg:p-4 rounded-full shadow-lg bg-white-default cursor-pointer hover:translate-y-[-0.25rem]"
    >
      <IconComponent className="size-8 lg:size-10 lg:block" />
    </span>
  );
}

export default function Footer({ activeTab }: { activeTab: MobileTabOption }) {
  return (
    <footer
      className={mergeClassNames(
        `flex flex-col h-full lg:min-h-[43.75rem] mt-6 lg:mt-32 p-8 lg:p-16 bg-gray-50 rounded-3xl`,
        activeTab === MOBILE_TAB_OPTIONS.TEAM
          ? 'block lg:block'
          : 'hidden lg:block',
      )}
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
          <span className="text-primary">싱크스팟(Syncspot)</span>은 다음과 같은
          과정을 거쳐 서비스를 완성했습니다.
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
        <div className="flex flex-wrap items-center gap-1">
          {TEAM_MEMBERS.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>
      </div>
      <div className="mt-6 text-description lg:text-menu text-gray-dark">
        <p>
          발전하는 팀 '모락(Morak)'의 소식은 인스타그램(@syncspot_official)과
          깃허브에서 확인할 수 있습니다!
        </p>
      </div>
      <div className="flex items-center justify-center gap-4 mt-4 lg:justify-end lg:gap-6">
        {SOCIAL_LINKS.map((link, index) => (
          <SocialIcon key={index} {...link} />
        ))}
      </div>
    </footer>
  );
}
