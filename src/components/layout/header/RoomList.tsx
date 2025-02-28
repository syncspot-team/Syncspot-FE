import IconDropdown from '@src/assets/icons/IconDropdown.svg?react';
import { PATH } from '@src/constants/path';
import { useClickOutside } from '@src/hooks/useClickOutside';
import { useGetJoinRoomQuery } from '@src/state/queries/header/useGetJoinRoomQuery';
import { useRoomStore } from '@src/state/store/roomStore';
import { OnboardingStepType } from '@src/types/onboarding/onboardingStepType';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import RoomListItem from './RoomListItem';
import { IRoom } from '@src/types/header/joinRoomResponseType';
import { Loading } from '@src/components/loading/Loading';

export default function RoomList() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLLIElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { roomId, setRoomId, setRoomName } = useRoomStore();
  const [selectedRoomName, setSelectedRoomName] = useState('전체 모임 목록');
  const { data: roomList, isLoading } = useGetJoinRoomQuery();
  const { roomId: urlRoomId } = useParams();

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  // URL 파라미터와 roomList 변경 감지
  useEffect(() => {
    if (urlRoomId && roomList?.data) {
      const roomFromUrl = roomList.data.find(
        (room: IRoom) => room.roomId === urlRoomId,
      );
      if (roomFromUrl) {
        setRoomId(roomFromUrl.roomId);
        setRoomName(roomFromUrl.roomName);
        setSelectedRoomName(roomFromUrl.roomName);
        return;
      }
    }
    if (roomList?.data && roomList.data.length > 0) {
      if (roomId) {
        const selectedRoom = roomList.data.find(
          (room: IRoom) => room.roomId === roomId,
        );
        if (selectedRoom) {
          setRoomId(selectedRoom.roomId);
          setRoomName(selectedRoom.roomName);
          setSelectedRoomName(selectedRoom.roomName);
        } else {
          const firstRoom = roomList.data[0];
          setRoomId(firstRoom.roomId);
          setRoomName(firstRoom.roomName);
          setSelectedRoomName(firstRoom.roomName);
        }
      } else {
        const firstRoom = roomList.data[0];
        setRoomId(firstRoom.roomId);
        setRoomName(firstRoom.roomName);
        setSelectedRoomName(firstRoom.roomName);
      }
    } else {
      setRoomId('');
      setSelectedRoomName('전체 모임 목록');
    }
  }, [roomList, roomId, urlRoomId]);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  const handleRoomSelect = (roomId: string, roomName: string) => {
    setRoomId(roomId);
    setRoomName(roomName);
    setIsDropdownOpen(false);
    navigate(PATH.LOCATION_ENTER(roomId));
  };

  const handleViewAllRooms = () => {
    setIsDropdownOpen(false);
    navigate(PATH.ONBOARDING);
  };

  return (
    <li
      ref={dropdownRef}
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="relative flex items-center cursor-pointer text-blue-dark01 p-2 lg:px-3 bg-blue-light01 rounded-[0.4375rem] whitespace-nowrap gap-[0.5rem]"
    >
      {isLoading ? (
        <div className="flex items-center justify-center w-[5.3125rem] lg:min-w-[5.9375rem] lg:max-w-[6.25rem] overflow-hidden max-h-[1.25rem]">
          <Loading />
        </div>
      ) : (
        <>
          <span className="w-[5.3125rem] lg:min-w-[5.9375rem] lg:max-w-[6.25rem] text-description lg:text-content truncate text-blue-dark01">
            {selectedRoomName}
          </span>
          <IconDropdown
            className={`size-4 lg:size-5 -mr-1 lg:-mr-2 text-blue-dark01 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          />
          <div
            className={`absolute left-0 top-full w-[7.5rem] lg:w-[8.75rem] mt-1 border border-gray-light rounded-[0.25rem] shadow-lg bg-white-default z-50 transition-all duration-300
              ${isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-0.625rem] pointer-events-none'}
            `}
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
                          initialStep:
                            OnboardingStepType.ONBOARDING_CREATE_STEP,
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
        </>
      )}
    </li>
  );
}
