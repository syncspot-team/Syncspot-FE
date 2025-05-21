import { MOBILE_TAB_OPTIONS, MobileTabOption } from '@widgets/about/model';
import { Button } from '@shared/ui';

export default function TabNavigation({
  activeTab,
  onTabChange,
}: {
  activeTab: MobileTabOption;
  // eslint-disable-next-line no-unused-vars
  onTabChange: (tab: MobileTabOption) => void;
}) {
  return (
    <div className="flex justify-around px-5 my-4 border-b text-description lg:hidden border-gray-normal">
      <Button
        buttonType={
          activeTab === MOBILE_TAB_OPTIONS.SERVICE ? 'primary' : 'tab'
        }
        fontSize="description"
        width="tab"
        className="mb-2 font-semibold rounded-lg"
        onClick={() => onTabChange(MOBILE_TAB_OPTIONS.SERVICE)}
      >
        서비스 소개
      </Button>
      <Button
        buttonType={activeTab === MOBILE_TAB_OPTIONS.TEAM ? 'primary' : 'tab'}
        fontSize="description"
        width="tab"
        className="mb-2 font-semibold rounded-lg"
        onClick={() => onTabChange(MOBILE_TAB_OPTIONS.TEAM)}
      >
        팀 모락모락
      </Button>
    </div>
  );
}
