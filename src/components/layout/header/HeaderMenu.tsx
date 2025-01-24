import { PATH } from '@src/constants/path';
import { useLoginStore } from '@src/state/store/loginStore';
import { useRoomIdStore } from '@src/state/store/roomIdStore';
import { useNavigate } from 'react-router-dom';
import IconUser from '@src/assets/icons/IconUser.svg?react';
import CustomToast from '@src/components/common/toast/customToast';
import { TOAST_TYPE } from '@src/types/toastType';

export default function HeaderMenu({
  isMobile = false,
  onMenuSelect,
}: {
  isMobile?: boolean;
  onMenuSelect?: () => void;
}) {
  const navigate = useNavigate();
  const { isLogin } = useLoginStore();
  const { roomId } = useRoomIdStore();

  const handleNavigateWithRoomCheck = (path: string) => {
    onMenuSelect?.();
    if (!isLogin) {
      navigate(PATH.SIGN_IN);
      return;
    }
    if (!roomId) {
      CustomToast({
        type: TOAST_TYPE.ERROR,
        message: '모임을 선택해주세요!',
      });
    } else {
      navigate(path);
    }
  };

  const menuItems = [
    {
      label: '중간 지점 찾기',
      onClick: () => handleNavigateWithRoomCheck(PATH.LOCATION_ENTER(roomId)),
    },
    {
      label: '장소 투표',
      onClick: () => handleNavigateWithRoomCheck(PATH.PLACE_VOTE(roomId)),
    },
    {
      label: '시간 투표',
      onClick: () => handleNavigateWithRoomCheck(PATH.TIME_VOTE(roomId)),
    },
    {
      label: '서비스 소개',
      onClick: () => {
        onMenuSelect?.();
        navigate(PATH.ABOUT);
      },
    },
  ];

  return (
    <ul
      className={`${
        isMobile
          ? 'flex flex-col w-full'
          : 'hidden lg:flex items-center gap-[0.625rem] text-gray-dark whitespace-nowrap *:cursor-pointer'
      }`}
    >
      {menuItems.map((item) => (
        <li
          key={item.label}
          onClick={item.onClick}
          className={`${
            isMobile
              ? 'p-4 text-content cursor-pointer'
              : 'py-2 px-3 rounded-[0.625rem] text-content'
          } hover:bg-gray-light rounded-[0.625rem]`}
        >
          {item.label}
        </li>
      ))}
      {isLogin ? (
        <li
          onClick={() => {
            navigate(PATH.MY_PAGE);
            isMobile && onMenuSelect?.();
          }}
          className={`${
            isMobile
              ? 'p-4 text-content cursor-pointer'
              : 'hover:bg-gray-light p-2 rounded-[0.625rem]'
          } hover:bg-gray-light rounded-[0.625rem]`}
        >
          {isMobile ? '마이페이지' : <IconUser className="size-6" />}
        </li>
      ) : (
        <li
          onClick={() => {
            navigate(PATH.SIGN_IN);
            isMobile && onMenuSelect?.();
          }}
          className={`${
            isMobile
              ? 'p-4 cursor-pointer text-content hover:bg-gray-light rounded-[0.625rem]'
              : 'border-tertiary border-login rounded-login px-3 text-content py-[0.3125rem] hover:bg-primary hover:border-primary hover:text-white-default ml-1'
          }`}
        >
          로그인
        </li>
      )}
    </ul>
  );
}
