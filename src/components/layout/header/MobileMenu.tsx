import { useRef, useState } from 'react';
import IconHamburgerMenu from '@src/assets/icons/IconHamburgerMenu.svg?react';
import IconHeaderXmark from '@src/assets/icons/IconHeaderXmark.svg?react';
import { useClickOutside } from '@src/hooks/useClickOutside';
import { useResponsiveClose } from '@src/hooks/useResponsiveClose';
import MobileMenuList from './MobileMenuList';
import IconMainLogo from '@src/assets/icons/IconMainLogo.svg?react';
import IconMobileMenuClose from '@src/assets/icons/IconMobileMenuClose.svg?react';

export default function MobileMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useClickOutside(menuRef, () => setIsMenuOpen(false));
  useResponsiveClose(1024, () => setIsMenuOpen(false));

  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2 hover:bg-gray-light rounded-[0.625rem] *:size-5"
      >
        {isMenuOpen ? <IconHeaderXmark /> : <IconHamburgerMenu />}
      </button>

      {/* 오버레이 */}
      <div
        className={`fixed inset-0 bg-overlay z-[90] transition-opacity duration-300
          ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* 메뉴 */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 bottom-0 w-[calc(100dvw-9rem)] bg-gray-light z-[100] transition-transform duration-300
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* 닫기 버튼 */}
        <div className="flex items-center justify-between p-4">
          <IconMainLogo className="p-2 size-11 bg-white-default rounded-default" />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 hover:bg-gray-light rounded-[0.625rem] text-black-default"
          >
            <IconMobileMenuClose className="size-6 text-gray-dark" />
          </button>
        </div>

        <MobileMenuList
          onCloseMenu={() => setIsMenuOpen(false)}
          isMenuOpen={isMenuOpen}
        />
      </div>
    </>
  );
}
