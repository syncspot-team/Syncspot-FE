import IconMainLogo from '@src/assets/icons/IconMainLogo.svg?react';
import IconUser from '@src/assets/icons/IconUser.svg?react';
import { PATH } from '@src/constants/path';
import { useLoginStore } from '@src/state/store/loginStore';
import { useNavigate } from 'react-router-dom';
import RoomList from './RoomList';
import { useRoomIdStore } from '@src/state/store/roomIdStore';

export default function Header() {
  const navigate = useNavigate();
  const { isLogin } = useLoginStore();
  const { roomId } = useRoomIdStore();

  return (
    <header className="mt-[1.5625rem]">
      <nav className="flex items-center justify-between px-[7.5rem] gap-[15.375rem]">
        <ul className="flex items-center gap-[1.25rem]">
          <li
            onClick={() => {
              navigate(PATH.ROOT);
            }}
            className="flex items-center gap-[0.3125rem] cursor-pointer"
          >
            <span>
              <IconMainLogo />
            </span>
            <span className="-mt-2 text-title text-tertiary">syncspot</span>
          </li>
          {isLogin && <RoomList />}
        </ul>
        <ul className="flex items-center gap-[0.625rem] text-gray-dark text-menu whitespace-nowrap *:cursor-pointer">
          <li
            onClick={() => {
              navigate(PATH.LOCATION_ENTER(roomId));
            }}
            className=" hover:bg-gray-light px-3 py-2 rounded-[0.625rem] transition-colors"
          >
            중간 지점 찾기
          </li>
          <li
            onClick={() => navigate(PATH.PLACE_VOTE(roomId))}
            className=" hover:bg-gray-light px-3 py-2 rounded-[0.625rem] transition-colors"
          >
            장소 투표
          </li>
          <li
            onClick={() => navigate(PATH.TIME_VOTE(roomId))}
            className=" hover:bg-gray-light px-3 py-2 rounded-[0.625rem] transition-colors"
          >
            시간 투표
          </li>
          <li
            onClick={() => navigate(PATH.ABOUT)}
            className=" hover:bg-gray-light px-3 py-2 rounded-[0.625rem] transition-colors"
          >
            서비스 소개
          </li>
          {isLogin ? (
            <li
              onClick={() => {
                navigate(PATH.MY_PAGE);
              }}
              className="p-2 rounded-[0.625rem] hover:bg-gray-light"
            >
              <IconUser />
            </li>
          ) : (
            <li
              onClick={() => {
                navigate(PATH.SIGN_IN);
              }}
              className="border-tertiary border-login rounded-login px-3 py-[0.3125rem] hover:bg-primary hover:border-primary hover:text-white-default"
            >
              로그인
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
