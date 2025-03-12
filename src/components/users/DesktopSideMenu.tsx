import SideMenuItem from './SideMenuItem';
import { sideMenuItems } from './constants/sideMenuItems';
import { useGetUserInfoQuery } from '@src/state/queries/users/useGetUserInfoQuery';
import { useLoginStore } from '@src/state/store/loginStore';
export default function DesktopSideMenu() {
  const { isLogin } = useLoginStore();
  const { data: userInfo } = useGetUserInfoQuery({
    enabled: isLogin,
  });

  return (
    <div className="bg-gray-light rounded-default p-3 min-h-[calc(100vh-9.375rem)]">
      {sideMenuItems.map((item) => (
        <div key={item.text}>
          <div className="flex items-center gap-3 py-3 pl-4 font-bold text-description text-gray-dark">
            <span>{item.text}</span>
          </div>
          <div className="mb-3 ml-5">
            {item.subItems
              .filter(
                (subItem) =>
                  !(
                    userInfo?.data?.isOauth && subItem.text === '비밀번호 변경'
                  ),
              )
              .map((subItem) => (
                <SideMenuItem
                  key={subItem.path}
                  item={{ ...subItem, isMobile: false }}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
