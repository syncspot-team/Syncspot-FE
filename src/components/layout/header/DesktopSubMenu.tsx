import { IMenuItem } from '@src/types/header/menuItemType';

interface IDesktopSubMenuProps {
  subMenus: IMenuItem[];
  onSubMenuClick: (e: React.MouseEvent<HTMLLIElement>, item: IMenuItem) => void;
}

export default function DesktopSubMenu({
  subMenus,
  onSubMenuClick,
}: IDesktopSubMenuProps) {
  return (
    <div className="absolute left-0 top-[100%] min-w-[9.375rem] z-50">
      <ul className="shadow-md rounded-[0.3125rem] bg-white-default mt-1">
        {subMenus.map((subMenu) => (
          <li
            key={subMenu.label}
            onClick={(e) => onSubMenuClick(e, subMenu)}
            className="px-3 py-3 cursor-pointer rounded-[0.3125rem] text-description hover:bg-gray-light"
          >
            {subMenu.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
