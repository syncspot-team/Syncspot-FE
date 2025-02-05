import { useLoginStore } from '@src/state/store/loginStore';
import RoomList from './RoomList';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import MainLogo from './MainLogo';

export default function Header() {
  const { isLogin } = useLoginStore();

  return (
    <header className="mt-[1.5625rem]">
      <nav className="flex items-center justify-between px-4 lg:px-[7.5rem] lg:gap-[2.5rem]">
        <ul className="flex items-center gap-[0.9375rem]">
          <MainLogo />
          {isLogin && <RoomList />}
        </ul>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden lg:block">
          <DesktopMenu />
        </ul>

        {/* 모바일 메뉴 */}
        <ul className="lg:hidden">
          <MobileMenu />
        </ul>
      </nav>
    </header>
  );
}
