import { useState } from 'react';
import {
  AboutService,
  TabNavigation,
  MidpointSection,
  PlaceVoteSection,
  TimeVoteSection,
  Footer,
} from '@widgets/about/ui';
import { MOBILE_TAB_OPTIONS, MobileTabOption } from '@widgets/about/model';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<MobileTabOption>(
    MOBILE_TAB_OPTIONS.SERVICE,
  );

  return (
    <div className="pb-20 mt-[1.875rem] px-4 lg:px-[7.5rem] select-none relative z-[1]">
      <AboutService />
      {/* 모바일 네비게이션 탭 */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 모바일 서비스 소개 컨텐츠 */}
      {activeTab === MOBILE_TAB_OPTIONS.SERVICE && (
        <div className="lg:hidden">
          <MidpointSection isMobile />
          <PlaceVoteSection isMobile />
          <TimeVoteSection isMobile />
        </div>
      )}

      {/* 데스크탑 UI - 기존 섹션들 */}
      <div className="hidden lg:block">
        <MidpointSection isMobile={false} />
        <PlaceVoteSection isMobile={false} />
        <TimeVoteSection isMobile={false} />
      </div>

      <Footer activeTab={activeTab} />
    </div>
  );
}
