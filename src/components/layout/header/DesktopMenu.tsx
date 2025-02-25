import { useState, useRef } from 'react';
import { useClickOutside } from '@src/hooks/useClickOutside';
import { useMenuItems } from '@src/hooks/header/useMenuItems';
import { IMenuItem } from '@src/types/header/menuItemType';
import DesktopSubMenu from './DesktopSubMenu';
import AuthButton from './AuthButton';
import ShareButton from './ShareButton';
import { PATH } from '@src/constants/path';
import { useLocation } from 'react-router-dom';

export default function DesktopMenu() {
  const menuRef = useRef<HTMLUListElement>(null);
  const [clickedMenu, setClickedMenu] = useState<string | null>(null);
  const location = useLocation();
  const menuItems = useMenuItems();

  useClickOutside(menuRef, () => setClickedMenu(null));

  const selectedRoomId = localStorage.getItem('selectedRoomId');

  function handleMenuClick(
    e: React.MouseEvent<HTMLDivElement>,
    item: IMenuItem,
  ) {
    e.stopPropagation();
    if (item.subMenus) {
      setClickedMenu(clickedMenu === item.label ? null : item.label);
    } else {
      setClickedMenu(null);
      item.onClick();
    }
  }

  function handleSubMenuClick(
    e: React.MouseEvent<HTMLLIElement>,
    item: IMenuItem,
  ) {
    e.stopPropagation();
    setClickedMenu(null);
    item.onClick();
  }

  function renderShareButton() {
    if (selectedRoomId) {
      const validPaths = [
        PATH.LOCATION_RESULT(selectedRoomId),
        PATH.LOCATION_RECOMMENDATIONS(selectedRoomId),
        PATH.PLACE_RESULT(selectedRoomId),
        PATH.TIME_VOTE(selectedRoomId),
        PATH.TIME_RESULT(selectedRoomId),
        PATH.ABOUT,
      ];
      const path = location.pathname;
      return validPaths.some((validPath) => path.includes(validPath));
    }
  }

  return (
    <>
      <ul
        ref={menuRef}
        className="flex items-center gap-[0.625rem] text-gray-dark whitespace-nowrap cursor-pointer text-content"
      >
        {menuItems.map((item) => (
          <li key={item.label} className="relative">
            <div
              className="py-2 px-3 hover:bg-gray-light rounded-[0.625rem]"
              onClick={(e) => handleMenuClick(e, item)}
            >
              <span>{item.label}</span>
            </div>
            {item.subMenus && clickedMenu === item.label && (
              <DesktopSubMenu
                subMenus={item.subMenus}
                onSubMenuClick={handleSubMenuClick}
              />
            )}
          </li>
        ))}
        {renderShareButton() && (
          <ShareButton
            onShareClick={() => {
              setClickedMenu(null);
            }}
          />
        )}
        <AuthButton onAuthClick={() => setClickedMenu(null)} isMobile={false} />
      </ul>
    </>
  );
}
