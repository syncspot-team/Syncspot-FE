import { sideMenuItems } from './constants/sideMenuItems';
import SideMenuItem from './SideMenuItem';
import { useGetUserInfoQuery } from '@src/state/queries/users/useGetUserInfoQuery';
import { useLoginStore } from '@src/state/store/loginStore';

export default function MobileSideMenu() {
  const { isLogin } = useLoginStore();
  const { data: userInfo } = useGetUserInfoQuery({
    enabled: isLogin,
  });

  return (
    <div className="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-hide">
      {sideMenuItems.flatMap((item) =>
        item.subItems
          .filter(
            (subItem) =>
              !(userInfo?.data?.isOauth && subItem.text === '비밀번호 변경'),
          )
          .map((subItem) => (
            <SideMenuItem
              key={subItem.path}
              item={{ ...subItem, isMobile: true }}
            />
          )),
      )}
    </div>
  );
}
