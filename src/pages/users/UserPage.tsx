import { Outlet } from 'react-router-dom';
import MobileSideMenu from '@src/components/users/MobileSideMenu';
import DesktopSideMenu from '@src/components/users/DesktopSideMenu';

export default function UserPage() {
  return (
    <div className="w-full px-4 lg:px-[7.5rem] mt-[1.875rem]">
      <div className="lg:hidden">
        <MobileSideMenu />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-[0.9375rem]">
        <div className="hidden lg:block lg:col-span-3">
          <DesktopSideMenu />
        </div>
        <div className="lg:col-span-7 bg-white-default h-[calc(100vh-9.375rem)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
