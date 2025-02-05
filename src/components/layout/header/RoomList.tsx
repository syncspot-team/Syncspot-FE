import IconDropdown from '@src/assets/icons/IconDropdown.svg?react';
import { PATH } from '@src/constants/path';
import { useClickOutside } from '@src/hooks/useClickOutside';
import { useGetJoinRoomQuery } from '@src/state/queries/header/useGetJoinRoomQuery';
import { useRoomIdStore } from '@src/state/store/roomIdStore';
import { OnboardingStepType } from '@src/types/onboarding/onboardingStepType';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomListItem from './RoomListItem';
import { IRoom } from '@src/types/header/joinRoomResponseType';

export default function RoomList() {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLLIElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedRoomName, setSelectedRoomName] = useState('전체 모임 목록');
  const { setRoomId } = useRoomIdStore();
  const { data: roomList, isLoading, error } = useGetJoinRoomQuery();

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  // 초기 데이터 설정
  useEffect(() => {
    if (roomList?.data && roomList.data.length > 0) {
      const firstRoom = roomList.data[0];
      setRoomId(firstRoom.roomId);
      setSelectedRoomName(firstRoom.roomName);
    } else {
      setRoomId('');
      setSelectedRoomName('전체 모임 목록');
    }
  }, [roomList]);

  const handleRoomSelect = (roomId: string, roomName: string) => {
    setSelectedRoomName(roomName);
    setRoomId(roomId);
    setIsDropdownOpen(false);
    navigate(PATH.LOCATION_ENTER(roomId));
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsAnimating(true);
  };

  const handleViewAllRooms = () => {
    setIsDropdownOpen(false);
    navigate(PATH.ONBOARDING);
  };

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <li className="p-2 lg:px-3 text-description lg:text-content">로딩중</li>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <li className="p-2 lg:px-3 text-description lg:text-content">오류</li>
    );
  }

  return (
    <li
      ref={dropdownRef}
      onClick={handleDropdownToggle}
      className="relative flex items-center cursor-pointer text-blue-dark01 p-2 lg:px-3 bg-blue-light01 rounded-[0.4375rem] whitespace-nowrap gap-[0.5rem]"
    >
      <span className="min-w-[3.75rem] lg:min-w-[5rem] text-description lg:text-content truncate text-blue-dark01">
        {selectedRoomName}
      </span>
      <IconDropdown
        className={`size-4 lg:size-5 -mr-1 lg:-mr-2 text-blue-dark01 ${
          isDropdownOpen ? 'rotate-180' : ''
        }`}
      />
      <div
        className={`absolute left-0 top-full w-full mt-1 border border-gray-light rounded-[0.25rem] shadow-lg  bg-white-default z-50
          ${isDropdownOpen ? 'animate-slideDown' : isAnimating ? 'animate-slideUp' : 'hidden'}
        `}
        onAnimationEnd={() => {
          if (!isDropdownOpen) {
            setIsAnimating(false);
          }
        }}
      >
        <div className="flex flex-col h-full">
          {roomList?.data.length && roomList.data.length > 0 ? (
            <>
              <ul className="max-h-[12.5rem] overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full">
                {roomList?.data.map((room: IRoom) => (
                  <RoomListItem
                    key={room.roomId}
                    roomId={room.roomId}
                    roomName={room.roomName}
                    onSelect={handleRoomSelect}
                  />
                ))}
              </ul>
              <div className="sticky bottom-0 bg-blue-light01 rounded-[0.25rem] ring-1 ring-blue-dark01 opacity-80 hover:opacity-100 m-2">
                <button
                  className="w-full p-2 lg:px-3 truncate cursor-pointer text-description lg:text-content rounded-[0.25rem]"
                  onClick={handleViewAllRooms}
                >
                  전체 모임 보기
                </button>
              </div>
            </>
          ) : (
            <div className="sticky bottom-0 bg-blue-light01 rounded-[0.25rem] ring-1 ring-blue-dark01 opacity-80 hover:opacity-100 m-2">
              <button
                className="w-full p-2 lg:px-3 truncate cursor-pointer text-description lg:text-content rounded-[0.25rem]"
                onClick={() =>
                  navigate(PATH.ONBOARDING, {
                    state: {
                      initialStep: OnboardingStepType.ONBOARDING_CREATE_STEP,
                    },
                  })
                }
              >
                모임 생성하기
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
