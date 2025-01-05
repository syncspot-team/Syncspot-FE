import IconDropdown from '@src/assets/icons/IconDropdown.svg?react';
import { PATH } from '@src/constants/path';
import { useRoomIdStore } from '@src/state/store/roomIdStore';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoomList() {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLLIElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('전체 모임 목록');
  const { setRoomId } = useRoomIdStore();
  const dummyData = {
    data: [
      { roomId: '1', roomName: '모임1sdfsdfsdfsdfsd' },
      { roomId: '2', roomName: '모임2' },
      { roomId: '3', roomName: '모임3' },
      { roomId: '4', roomName: '모임4' },
      { roomId: '5', roomName: '모임5' },
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
    setSelectedRoom(roomName);
    setRoomId(roomId);
    setIsDropdownOpen(false);
    navigate(PATH.LOCATION_ENTER(roomId));
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
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="relative text-menu flex items-center cursor-pointer text-blue-dark01 px-3 py-2 bg-blue-light01 rounded-[0.625rem] whitespace-nowrap gap-[0.125rem]"
    >
      <span className="min-w-[6.25rem]">{selectedRoom}</span>
      <IconDropdown
        className={`size-5 -mr-2 ${isDropdownOpen ? 'rotate-180' : ''}`}
      />
      {isDropdownOpen && (
        <div className="absolute left-0 w-full mt-1 border border-gray-200 rounded-lg shadow-lg top-full bg-white-default">
          <ul>
            {/* {roomList?.data && roomList.data.length > 0 ? (
              roomList.data.map(
                (room: { roomId: string; roomName: string }) => (
                  <li
                    key={room.roomId}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-light"
                    onClick={() => handleRoomSelect(room.roomId, room.roomName)}
                  >
                    {room.roomName}
                  </li>
                ),
              )
            ) : (
              <li className="px-4 py-2">모임을 생성해주세요!</li>
            )} */}
            {dummyData.data.map((room) => (
              <li
                key={room.roomId}
                className="px-4 py-2 truncate cursor-pointer hover:bg-gray-light"
                onClick={() => handleRoomSelect(room.roomId, room.roomName)}
              >
                {room.roomName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
