import IconDropdown from '@src/assets/icons/IconDropdown.svg?react';
import { PATH } from '@src/constants/path';
import { useRoomIdStore } from '@src/state/store/roomIdStore';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoomList() {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLLIElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedRoomName, setSelectedRoomName] = useState('전체 모임 목록');
  const { setRoomId } = useRoomIdStore();
  const dummyData = {
    data: [
      { roomId: '1', roomName: '모임1sdfsdfsdfsdfsd' },
      { roomId: '2', roomName: '모임2' },
      { roomId: '3', roomName: '모임3' },
      { roomId: '4', roomName: '모임4' },
      { roomId: '5', roomName: '모임5' },
      { roomId: '6', roomName: '모임6' },
      { roomId: '7', roomName: '모임7' },
      { roomId: '8', roomName: '모임8' },
      { roomId: '9', roomName: '모임9' },
      { roomId: '10', roomName: '모임10' },
    ],
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  //   API 요청 추가
  //   const { data: roomList, isLoading, error } = useGetJoinRoomQuery();

  //   // 초기 데이터 설정
  //   useEffect(() => {
  //     if (roomList?.data && roomList.data.length > 0) {
  //       const firstRoom = roomList.data[0];
  //       setRoomId(firstRoom.roomId);
  //       setSelectedRoom(firstRoom.roomName);
  //     } else {
  //       setRoomId('');
  //       setSelectedRoom('전체 모임 목록');
  //     }
  //   }, [roomList]);

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
  //   if (isLoading) {
  //     return <li className="px-3 py-2 text-menu">로딩중...</li>;
  //   }

  //   // 에러 상태 처리
  //   if (error) {
  //     return <li className="px-3 py-2 text-menu">오류가 발생했습니다</li>;
  //   }

  return (
    <li
      ref={dropdownRef}
      onClick={handleDropdownToggle}
      className="relative flex items-center cursor-pointer text-blue-dark01 p-2 lg:px-3 bg-blue-light01 rounded-[0.4375rem] whitespace-nowrap gap-[0.5rem]"
    >
      <span className="min-w-[3.75rem] lg:min-w-[5rem] text-description lg:text-content truncate">
        {selectedRoomName}
      </span>
      <IconDropdown
        className={`size-4 lg:size-5 -mr-1 lg:-mr-2 ${
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
          <ul className="max-h-[12.5rem] overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full">
            {dummyData.data.map((room) => (
              <li
                key={room.roomId}
                className="p-2 truncate cursor-pointer lg:px-3 text-description lg:text-content hover:bg-gray-light rounded-[0.25rem]"
                onClick={() => handleRoomSelect(room.roomId, room.roomName)}
              >
                {room.roomName}
              </li>
            ))}
          </ul>
          {dummyData.data.length > 0 && (
            <div className="sticky bottom-0 bg-blue-light01 rounded-[0.25rem] ring-1 ring-blue-dark01 opacity-80 hover:opacity-100">
              <button
                className="w-full p-2 truncate cursor-pointer lg:px-3 text-description lg:text-content rounded-[0.25rem]"
                onClick={handleViewAllRooms}
              >
                전체 모임 보기
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
