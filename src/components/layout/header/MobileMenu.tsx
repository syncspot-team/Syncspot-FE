import { useRef, useState } from 'react';
import IconHamburgerMenu from '@src/assets/icons/IconHamburgerMenu.svg?react';
import IconHeaderXmark from '@src/assets/icons/IconHeaderXmark.svg?react';
import { useClickOutside } from '@src/hooks/useClickOutside';
import { useResponsiveClose } from '@src/hooks/useResponsiveClose';
import MobileMenuList from './MobileMenuList';
import IconMainLogo from '@src/assets/icons/IconMainLogo.svg?react';
import IconMobileMenuClose from '@src/assets/icons/IconMobileMenuClose.svg?react';
import ShareButton from './ShareButton';
import { renderShareButton } from '@src/utils/renderShareButton';
import { useLocation } from 'react-router-dom';

export default function MobileMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useClickOutside(menuRef, () => setIsMenuOpen(false));
  useResponsiveClose(1024, () => setIsMenuOpen(false));

  const location = useLocation();
  const selectedRoomId = localStorage.getItem('selectedRoomId');
  const IsRenderShareButton = renderShareButton(selectedRoomId, true, location);

  return (
    <>
      <div className="flex items-center">
        {/* 공유 */}
        {IsRenderShareButton && <ShareButton />}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-gray-light rounded-[0.625rem] *:size-5"
        >
          {isMenuOpen ? <IconHeaderXmark /> : <IconHamburgerMenu />}
        </button>
      </div>

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
        className={`fixed top-0 right-0 bottom-0 w-[calc(100dvw-9rem)] bg-white-default z-[100] transition-transform duration-300 overflow-y-auto
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* 닫기 버튼 */}
        <div className="flex items-center justify-between p-3 pt-6 pr-[1.125rem]">
          <IconMainLogo className="p-2 shadow-md size-11 bg-white-default rounded-default ring-1 ring-gray-light" />
          <IconMobileMenuClose
            onClick={() => setIsMenuOpen(false)}
            className="cursor-pointer size-6 text-gray-dark"
          />
        </div>

        <MobileMenuList
          onCloseMenu={() => setIsMenuOpen(false)}
          isMenuOpen={isMenuOpen}
        />
      </div>
    </>
  );
}
