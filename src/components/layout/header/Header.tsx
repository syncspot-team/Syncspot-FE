import IconMainLogo from '@src/assets/icons/IconMainLogo.svg?react';
import { PATH } from '@src/constants/path';
import { useLoginStore } from '@src/state/store/loginStore';
import { useNavigate } from 'react-router-dom';
import RoomList from './RoomList';
import IconHamburgerMenu from '@src/assets/icons/IconHamburgerMenu.svg?react';
import IconHeaderXmark from '@src/assets/icons/IconHeaderXmark.svg?react';
import { useState, useEffect, useRef } from 'react';
import HeaderMenu from './HeaderMenu';

export default function Header() {
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isLogin } = useLoginStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsAnimating(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      // tailwindcss기준 md 브레이크포인트
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="mt-[1.5625rem]">
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-[7.5rem] lg:gap-[2.5rem]">
        <ul className="flex items-center gap-[0.9375rem] lg:gap-[1.25rem]">
          <li
            onClick={() => {
              navigate(PATH.ROOT);
            }}
            className="flex items-center gap-[0.3125rem] cursor-pointer"
          >
            <div className="flex items-center gap-[0.3125rem]">
              <IconMainLogo className="size-[1.5rem] lg:size-[2rem]" />
              <span className="-mt-2 text-title lg:text-logo text-tertiary">
                syncspot
              </span>
            </div>
          </li>
          {isLogin && <RoomList />}
        </ul>

        {/* 데스크탑 메뉴 */}
        <HeaderMenu isMobile={false} />

        {/* 모바일 메뉴 버튼 */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-gray-light rounded-[0.625rem]"
          >
            {isMenuOpen ? (
              <IconHeaderXmark className="size-5" />
            ) : (
              <IconHamburgerMenu className="size-5" />
            )}
          </button>
        </div>

        {/* 모바일 메뉴 드롭다운 */}
        <div
          ref={menuRef}
          className={`absolute top-[3.875rem] text-gray-dark left-0 right-0 bg-white-default lg:hidden z-50
            ${isMenuOpen ? 'animate-slideDown' : isAnimating ? 'animate-slideUp' : 'hidden'}
          `}
          onAnimationEnd={() => {
            if (!isMenuOpen) {
              setIsAnimating(false);
            }
          }}
        >
          <HeaderMenu
            isMobile={true}
            onMenuSelect={() => setIsMenuOpen(false)}
          />
        </div>
      </nav>
    </header>
  );
}
