import { NavLink } from 'react-router-dom';

export interface ISideMenuItem {
  text: string;
  path: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isMobile: boolean;
}

export default function SideMenuItem({ item }: { item: ISideMenuItem }) {
  const Icon = item.icon;

  return (
    <NavLink
      key={item.path}
      to={item.path}
      className={({ isActive }) =>
        `flex items-center transition-none ${
          item.isMobile
            ? 'whitespace-nowrap px-4 py-2 rounded-full text-description'
            : 'gap-2 p-2 rounded-lg hover:bg-gray-200 mb-2'
        } ${
          isActive
            ? item.isMobile
              ? 'bg-blue-light01 text-blue-dark01'
              : 'bg-blue-100 text-blue-dark01'
            : item.isMobile
              ? 'bg-gray-light text-gray-dark'
              : 'text-gray-dark'
        }`
      }
    >
      {!item.isMobile && <Icon className="transition-none size-[1.125rem]" />}
      <span className="text-description lg:text-content">{item.text}</span>
    </NavLink>
  );
}
