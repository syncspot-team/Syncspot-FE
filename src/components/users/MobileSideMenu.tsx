import { sideMenuItems } from './constants/sideMenuItems';
import SideMenuItem from './SideMenuItem';

export default function MobileSideMenu() {
  return (
    <div className="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-hide">
      {sideMenuItems.flatMap((item) =>
        item.subItems.map((subItem) => (
          <SideMenuItem
            key={subItem.path}
            item={{ ...subItem, isMobile: true }}
          />
        )),
      )}
    </div>
  );
}
