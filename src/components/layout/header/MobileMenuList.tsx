import { useState, useEffect } from 'react';
import { useMenuItems } from '@src/hooks/header/useMenuItems';
import { IMenuItem } from '@src/types/header/menuItemType';
import MobileSubMenu from './MobileSubMenu';
import AuthButton from './AuthButton';
import IconDropdown from '@src/assets/icons/IconDropdown.svg?react';

interface IMobileMenuListProps {
  onMenuSelect: () => void;
  isMenuOpen: boolean;
}

export default function MobileMenuList({
  onMenuSelect,
  isMenuOpen,
}: IMobileMenuListProps) {
  const [clickedMenu, setClickedMenu] = useState<string | null>(null);
  const menuItems = useMenuItems(onMenuSelect);

  useEffect(() => {
    if (!isMenuOpen) {
      setClickedMenu(null);
    }
  }, [isMenuOpen]);

  const handleMenuClick = (
    e: React.MouseEvent<HTMLDivElement>,
    item: IMenuItem,
  ) => {
    e.stopPropagation();
    if (item.subMenus) {
      setClickedMenu(clickedMenu === item.label ? null : item.label);
    } else {
      onMenuSelect();
      item.onClick();
    }
  };

  const handleSubMenuClick = (
    e: React.MouseEvent<HTMLLIElement>,
    item: IMenuItem,
  ) => {
    e.stopPropagation();
    setClickedMenu(null);
    onMenuSelect();
    item.onClick();
  };

  return (
    <ul className="flex flex-col w-full cursor-pointer text-gray-dark whitespace-nowrap text-content">
      {menuItems.map((item) => (
        <li key={item.label}>
          <div
            className="flex items-center justify-between p-4 hover:bg-gray-light"
            onClick={(e) => handleMenuClick(e, item)}
          >
            <span>{item.label}</span>
            {item.subMenus && (
              <IconDropdown
                className={`size-5 transition-transform mr-2 ${
                  clickedMenu === item.label ? 'rotate-180' : ''
                }`}
              />
            )}
          </div>
          {item.subMenus && clickedMenu === item.label && (
            <div className="bg-white-default">
              <MobileSubMenu
                subMenus={item.subMenus}
                onSubMenuClick={handleSubMenuClick}
              />
            </div>
          )}
        </li>
      ))}
      <AuthButton onAuthClick={onMenuSelect} isMobile={true} />
    </ul>
  );
}
