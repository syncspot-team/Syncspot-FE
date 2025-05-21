import IconEditTabler from '@assets/icons/IconEditTabler.svg?react';
import IconAddressBook from '@assets/icons/IconAddressBook.svg?react';
import IconPassword from '@assets/icons/IconPassword.svg?react';
import IconLogout from '@assets/icons/IconLogout.svg?react';
import IconUserQuit from '@assets/icons/IconUserQuit.svg?react';
import { PATH } from '@shared/constants';

export const sideMenuItems = [
  {
    text: '프로필 관리',
    subItems: [
      {
        text: '프로필 수정',
        path: PATH.USERS + '/' + PATH.USERS_PROFILE,
        icon: IconEditTabler,
      },
    ],
  },
  {
    text: '모임 보기',
    subItems: [
      {
        text: '전체 모임 목록',
        path: PATH.USERS + '/' + PATH.USERS_GROUP_LISTS,
        icon: IconAddressBook,
      },
    ],
  },
  {
    text: '계정 설정',
    subItems: [
      {
        text: '비밀번호 변경',
        path: PATH.USERS + '/' + PATH.USERS_PASSWORD,
        icon: IconPassword,
      },
      {
        text: '로그아웃',
        path: PATH.USERS + '/' + PATH.USERS_LOGOUT,
        icon: IconLogout,
      },
      {
        text: '회원 탈퇴',
        path: PATH.USERS + '/' + PATH.USERS_QUIT,
        icon: IconUserQuit,
      },
    ],
  },
] as const;
