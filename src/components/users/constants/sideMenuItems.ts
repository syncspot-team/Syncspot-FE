import IconEditTabler from '@src/assets/icons/IconEditTabler.svg?react';
import IconAddressBook from '@src/assets/icons/IconAddressBook.svg?react';
import IconLogout from '@src/assets/icons/IconLogout.svg?react';
import IconUserQuit from '@src/assets/icons/IconUserQuit.svg?react';
import { PATH } from '@src/constants/path';

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
