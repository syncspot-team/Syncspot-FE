import { PATH } from '@src/constants/path';
import { useLoginStore } from '@src/state/store/loginStore';
import { useRoomIdStore } from '@src/state/store/roomIdStore';
import { useNavigate } from 'react-router-dom';
import IconUser from '@src/assets/icons/IconUser.svg?react';
import IconDropdown from '@src/assets/icons/IconDropdown.svg?react';
import CustomToast from '@src/components/common/toast/customToast';
import { TOAST_TYPE } from '@src/types/toastType';
import { useState, useRef, useEffect } from 'react';

export default function HeaderMenu({
  isMobile,
  onMenuSelect,
}: {
  isMobile: boolean;
  onMenuSelect?: () => void;
}) {
  const menuRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const { isLogin } = useLoginStore();
  const { roomId } = useRoomIdStore();
  const [clickedMenu, setClickedMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setClickedMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      subMenus: [
        {
          label: '모임 생성',
          onClick: () => handleNavigateWithRoomCheck(PATH.ONBOARDING),
        },
        {
          label: '장소 입력',
          onClick: () =>
            handleNavigateWithRoomCheck(PATH.LOCATION_ENTER(roomId)),
        },
        {
          label: '중간 지점 찾기 결과',
          onClick: () =>
            handleNavigateWithRoomCheck(PATH.LOCATION_RESULT(roomId)),
        },
      ],
    },
    {
      label: '장소 투표',
      onClick: () => handleNavigateWithRoomCheck(PATH.PLACE_VOTE(roomId)),
      subMenus: [
        {
          label: '장소 투표 생성',
          onClick: () => handleNavigateWithRoomCheck(PATH.PLACE_CREATE(roomId)),
        },
        {
          label: '장소 투표하기',
          onClick: () => handleNavigateWithRoomCheck(PATH.PLACE_VOTE(roomId)),
        },
        {
          label: '장소 투표 결과',
          onClick: () => handleNavigateWithRoomCheck(PATH.PLACE_RESULT(roomId)),
        },
      ],
    },
    {
      label: '시간 투표',
      onClick: () => handleNavigateWithRoomCheck(PATH.TIME_VOTE(roomId)),
      subMenus: [
        {
          label: '시간 투표 생성',
          onClick: () => handleNavigateWithRoomCheck(PATH.TIME_CREATE(roomId)),
        },
        {
          label: '시간 투표하기',
          onClick: () => handleNavigateWithRoomCheck(PATH.TIME_VOTE(roomId)),
        },
        {
          label: '시간 투표 결과',
          onClick: () => handleNavigateWithRoomCheck(PATH.TIME_RESULT(roomId)),
        },
      ],
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
      ref={menuRef}
      className={`${
        isMobile
          ? 'flex flex-col w-full'
          : 'hidden lg:flex items-center gap-[0.625rem]'
      } text-gray-dark whitespace-nowrap cursor-pointer text-content`}
    >
      {menuItems.map((item) => (
        <li key={item.label} className="relative">
          <div
            className={`${
              isMobile ? 'p-4 flex justify-between items-center' : 'py-2 px-3'
            } hover:bg-gray-light rounded-[0.625rem]`}
            onClick={(e) => {
              e.stopPropagation();
              if (item.subMenus) {
                setClickedMenu(clickedMenu === item.label ? null : item.label);
              } else {
                item.onClick();
              }
            }}
          >
            <span>{item.label}</span>
            {item.subMenus && isMobile && (
              <IconDropdown
                className={`size-5 transition-transform mr-2 ${
                  clickedMenu === item.label ? 'rotate-180' : ''
                }`}
              />
            )}
          </div>
          {item.subMenus && clickedMenu === item.label && (
            <div
              className={`${
                isMobile
                  ? 'bg-white-default'
                  : 'absolute left-0 top-[100%] min-w-[9.375rem] z-50'
              }`}
            >
              <ul
                className={`${
                  isMobile
                    ? 'animate-slideDown'
                    : 'shadow-md rounded-[0.3125rem] bg-white-default mt-1'
                }`}
              >
                {item.subMenus.map((subMenu) => (
                  <li
                    key={subMenu.label}
                    onClick={(e) => {
                      e.stopPropagation();
                      subMenu.onClick();
                      setClickedMenu(null);
                    }}
                    className={`${
                      isMobile ? 'px-6 py-3' : 'px-3 py-3'
                    } cursor-pointer rounded-[0.3125rem] text-description hover:bg-gray-light`}
                  >
                    {subMenu.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
      {isLogin ? (
        <li
          onClick={() => {
            navigate(PATH.USERS + '/' + PATH.USERS_PROFILE);
            isMobile && onMenuSelect?.();
          }}
          className={`${
            isMobile ? 'p-4' : 'p-2'
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
              ? 'p-4 cursor-pointer hover:bg-gray-light rounded-[0.625rem]'
              : 'border-gray-normal border-login rounded-login px-3 py-[0.3125rem] hover:bg-primary hover:border-primary hover:text-white-default ml-1'
          }`}
        >
          로그인
        </li>
      )}
    </ul>
  );
}
