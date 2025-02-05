import { useState, useRef } from 'react';
import { useClickOutside } from '@src/hooks/useClickOutside';
import { useMenuItems } from '@src/hooks/header/useMenuItems';
import { IMenuItem } from '@src/types/header/menuItemType';
import DesktopSubMenu from './DesktopSubMenu';
import AuthButton from './AuthButton';

export default function DesktopMenu() {
  const menuRef = useRef<HTMLUListElement>(null);
  const [clickedMenu, setClickedMenu] = useState<string | null>(null);
  const menuItems = useMenuItems();

  useClickOutside(menuRef, () => setClickedMenu(null));

  function handleMenuClick(
    e: React.MouseEvent<HTMLDivElement>,
    item: IMenuItem,
  ) {
    e.stopPropagation();
    if (item.subMenus) {
      setClickedMenu(clickedMenu === item.label ? null : item.label);
    } else {
      item.onClick();
      setClickedMenu(null);
    }
  }

  function handleSubMenuClick(
    e: React.MouseEvent<HTMLLIElement>,
    item: IMenuItem,
  ) {
    e.stopPropagation();
    item.onClick();
    setClickedMenu(null);
  }

  return (
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
      <AuthButton onAuthClick={() => setClickedMenu(null)} />
    </ul>
  );
}
