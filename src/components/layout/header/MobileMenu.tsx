import { useRef, useState } from 'react';
import IconHamburgerMenu from '@src/assets/icons/IconHamburgerMenu.svg?react';
import IconHeaderXmark from '@src/assets/icons/IconHeaderXmark.svg?react';
import { useClickOutside } from '@src/hooks/useClickOutside';
import { useResponsiveClose } from '@src/hooks/useResponsiveClose';
import MobileMenuList from './MobileMenuList';

export default function MobileMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsAnimating(true);
  };

  useClickOutside(menuRef, () => setIsMenuOpen(false));
  useResponsiveClose(1024, () => setIsMenuOpen(false));

  return (
    <>
      <button
        onClick={toggleMenu}
        className="p-2 hover:bg-gray-light rounded-[0.625rem] *:size-5"
      >
        {isMenuOpen ? <IconHeaderXmark /> : <IconHamburgerMenu />}
      </button>

      <div
        ref={menuRef}
        className={`fixed top-[4rem] text-gray-dark left-0 right-0 bg-white-default z-[100] border-2 border-red-500
          ${isMenuOpen ? 'animate-slideDown' : isAnimating ? 'animate-slideUp' : 'hidden'}
        `}
        onAnimationEnd={() => {
          if (!isMenuOpen) {
            setIsAnimating(false);
          }
        }}
      >
        <MobileMenuList
          onMenuSelect={() => setIsMenuOpen(false)}
          isMenuOpen={isMenuOpen}
        />
      </div>
    </>
  );
}
