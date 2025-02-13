import SideMenuItem from './SideMenuItem';
import { sideMenuItems } from './constants/sideMenuItems';

export default function DesktopSideMenu() {
  return (
    <div className="bg-gray-light rounded-default p-3 min-h-[calc(100vh-9.375rem)]">
      {sideMenuItems.map((item) => (
        <div key={item.text}>
          <div className="flex items-center gap-3 py-3 pl-4 font-bold text-description text-gray-dark">
            <span>{item.text}</span>
          </div>
          <div className="mb-3 ml-5">
            {item.subItems.map((subItem) => (
              <SideMenuItem
                key={subItem.path}
                item={{ ...subItem, isMobile: false }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
