import { useState } from 'react';
import IconEditPen from '@src/assets/icons/IconEditPen.svg?react';
import Button from '@src/components/common/button/Button';

interface IRoomDetailInfoModalProps {
  room: {
    roomId: string;
    roomName: string;
  };
  onClose: () => void;
}

export default function RoomDetailInfoModal({
  onClose,
}: IRoomDetailInfoModalProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingMemo, setIsEditingMemo] = useState(false);
  const [roomName, setRoomName] = useState('싱크고 동창회');
  const [memo, setMemo] = useState('2024년 19기 동창회');
  const [roomInfo, setRoomInfo] = useState({
    roomName: '싱크고 동창회',
    memo: '2024년 19기 동창회',
    emails: [
      'syncspotfighting@gmail.com',
      'syncspotfighting@gmail.com',
      'syncspotfighting@gmail.com',
      'syncspotfighting@gmail.com',
      'syncspotfighting@gmail.com',
      'syncspotfighting@gmail.com',
      'syncspotfighting@gmail.com',
      'syncspotfighting@gmail.com',
    ],
  });

  const handleEditName = () => {
    if (isEditingName) {
      // API 호출하여 이름 업데이트하는 과정 추후에 추가 예정
      setRoomInfo((prev) => ({
        ...prev,
        roomName: roomName,
      }));
    }
    setIsEditingName(!isEditingName);
  };

  const handleEditMemo = () => {
    if (isEditingMemo) {
      // API 호출하여 메모 업데이트하는 과정 추후에 추가 예정
      setRoomInfo((prev) => ({
        ...prev,
        memo: memo,
      }));
    }
    setIsEditingMemo(!isEditingMemo);
  };

  return (
    <div className="w-[17.5rem] lg:w-[25rem] flex flex-col items-center">
      <h1 className="mb-6 text-center text-subtitle lg:text-title text-tertiary">
        모임 정보
      </h1>
      <div className="flex flex-col w-full mb-3">
        <h3 className="text-content lg:text-menu text-blue-dark03">이름</h3>
        <div className="flex items-center justify-between gap-2">
          {isEditingName ? (
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="flex-1 p-1 rounded-lg ring-1 ring-gray-normal text-description lg:text-content"
            />
          ) : (
            <p className="flex-1 truncate text-description lg:text-content">
              {roomInfo.roomName}
            </p>
          )}
          {isEditingName ? (
            <span
              onClick={handleEditName}
              className="cursor-pointer p-2 text-description bg-blue-light01 text-blue-dark03 hover:bg-blue-light02 rounded-[0.5rem]"
            >
              완료
            </span>
          ) : (
            <IconEditPen
              className="cursor-pointer p-1 rounded-[0.5rem] hover:bg-gray-light"
              onClick={handleEditName}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col w-full mb-3">
        <h3 className="text-content lg:text-menu text-blue-dark03">메모</h3>
        <div className="flex items-center justify-between gap-2">
          {isEditingMemo ? (
            <input
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="flex-1 p-1 rounded-lg ring-1 ring-gray-normal text-description lg:text-content"
            />
          ) : (
            <p className="flex-1 truncate text-description lg:text-content">
              {roomInfo.memo}
            </p>
          )}
          {isEditingMemo ? (
            <span
              onClick={handleEditMemo}
              className="cursor-pointer p-2 text-description bg-blue-light01 text-blue-dark03 hover:bg-blue-light02 rounded-[0.5rem]"
            >
              완료
            </span>
          ) : (
            <IconEditPen
              className="cursor-pointer p-1 rounded-[0.5rem] hover:bg-gray-light"
              onClick={handleEditMemo}
            />
          )}
        </div>
      </div>

      <h1 className="my-6 text-center text-subtitle lg:text-title text-tertiary">
        모임 참여 인원
      </h1>
      <ul className="max-h-[10rem] w-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full p-1">
        {roomInfo.emails.map((email) => (
          <li key={email} className="p-2 text-description text-blue-dark03">
            {email}
          </li>
        ))}
      </ul>

      <Button onClick={onClose} className="w-full mt-4 px-[0.3125rem]">
        모임 나가기
      </Button>
      <Button
        buttonType="secondary"
        onClick={onClose}
        className="w-full mt-4 px-[0.3125rem]"
      >
        닫기
      </Button>
    </div>
  );
}
