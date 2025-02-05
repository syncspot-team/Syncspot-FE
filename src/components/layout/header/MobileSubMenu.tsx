import { IMenuItem } from '@src/types/header/menuItemType';

interface IMobileSubMenuProps {
  subMenus: IMenuItem[];
  onSubMenuClick: (e: React.MouseEvent<HTMLLIElement>, item: IMenuItem) => void;
}

export default function MobileSubMenu({
  subMenus,
  onSubMenuClick,
}: IMobileSubMenuProps) {
  return (
    <ul>
      {subMenus.map((subMenu) => (
        <li
          key={subMenu.label}
          onClick={(e) => {
            onSubMenuClick(e, subMenu);
          }}
          className="px-6 py-3 cursor-pointer hover:bg-gray-light text-description"
        >
          {subMenu.label}
        </li>
      ))}
    </ul>
  );
}
