import IconMainLogo from '@src/assets/icons/IconMainLogo.svg?react';
import IconUser from '@src/assets/icons/IconUser.svg?react';
import { PATH } from '@src/constants/path';
import { useLoginStore } from '@src/state/store/loginStore';
import { useNavigate } from 'react-router-dom';
import RoomList from './RoomList';
import { useRoomIdStore } from '@src/state/store/roomIdStore';
import CustomToast from '@src/components/common/toast/customToast';
import { TOAST_TYPE } from '@src/types/toastType';
import IconHamburgerMenu from '@src/assets/icons/IconHamburgerMenu.svg?react';
import IconHeaderXmark from '@src/assets/icons/IconHeaderXmark.svg?react';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const { isLogin } = useLoginStore();
  const { roomId } = useRoomIdStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
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
      onClick: () => navigate(PATH.ABOUT),
    },
  ];

  const handleNavigateWithRoomCheck = (path: string) => {
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsAnimating(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      // tailwindcss기준 md 브레이크포인트
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="mt-[1.5625rem]">
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-[7.5rem] lg:gap-[2.5rem]">
        <ul className="flex items-center gap-[0.9375rem] lg:gap-[1.25rem]">
          <li
            onClick={() => {
              navigate(PATH.ROOT);
            }}
            className="flex items-center gap-[0.3125rem] cursor-pointer"
          >
            <div className="flex items-center gap-[0.3125rem]">
              <IconMainLogo className="size-[1.5rem] lg:size-[2rem]" />
              <span className="-mt-2 text-title lg:text-logo text-tertiary">
                syncspot
              </span>
            </div>
          </li>
          {isLogin && <RoomList />}
        </ul>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden md:flex items-center gap-[0.625rem] text-gray-dark text-menu whitespace-nowrap *:cursor-pointer">
          {menuItems.map((item) => (
            <li
              key={item.label}
              onClick={item.onClick}
              className="hover:bg-gray-light px-2 py-3 sm:px-3 sm:py-3 rounded-[0.625rem] text-sm lg:text-menu"
            >
              {item.label}
            </li>
          ))}
          {isLogin ? (
            <li
              onClick={() => navigate(PATH.MY_PAGE)}
              className="hover:bg-gray-light px-2 sm:px-3 py-2 rounded-[0.625rem]"
            >
              <IconUser />
            </li>
          ) : (
            <li
              onClick={() => navigate(PATH.SIGN_IN)}
              className="border-tertiary border-login rounded-login px-2 sm:px-3 text-sm lg:text-menu py-[0.3125rem] hover:bg-primary hover:border-primary hover:text-white-default ml-1"
            >
              로그인
            </li>
          )}
        </ul>

        {/* 모바일 메뉴 버튼 */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-gray-light rounded-[0.625rem]"
          >
            {isMenuOpen ? <IconHeaderXmark /> : <IconHamburgerMenu />}
          </button>
        </div>

        {/* 모바일 메뉴 드롭다운 */}
        <div
          ref={menuRef}
          className={`absolute top-[4.0625rem] text-gray-dark left-0 right-0 bg-white-default lg:hidden z-50
            ${isMenuOpen ? 'animate-slideDown' : isAnimating ? 'animate-slideUp' : 'hidden'}
          `}
          onAnimationEnd={() => {
            if (!isMenuOpen) {
              setIsAnimating(false);
            }
          }}
        >
          <ul className="flex flex-col w-full">
            {menuItems.map((item) => (
              <li
                key={item.label}
                onClick={() => {
                  item.onClick();
                  setIsMenuOpen(false);
                }}
                className="p-4 text-sm cursor-pointer sm:px-6 sm:text-content rounded-default hover:bg-gray-light"
              >
                {item.label}
              </li>
            ))}
            {isLogin ? (
              <li
                onClick={() => {
                  navigate(PATH.MY_PAGE);
                  setIsMenuOpen(false);
                }}
                className="p-4 text-sm cursor-pointer sm:px-6 sm:text-content rounded-default hover:bg-gray-light"
              >
                마이페이지
              </li>
            ) : (
              <li
                onClick={() => {
                  navigate(PATH.SIGN_IN);
                  setIsMenuOpen(false);
                }}
                className="p-4 text-sm cursor-pointer sm:px-6 sm:text-content rounded-default hover:bg-gray-light"
              >
                로그인
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
