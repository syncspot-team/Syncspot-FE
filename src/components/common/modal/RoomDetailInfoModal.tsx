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
  const DUMMY_ROOMINFO = {
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
  };

  return (
    <div className="w-[17.5rem] lg:w-[25rem] flex flex-col items-center">
      <h1 className="mb-6 text-center text-subtitle lg:text-title text-tertiary">
        모임 정보
      </h1>
      <div className="flex flex-col w-full">
        <h3 className="text-content lg:text-menu text-blue-dark03">이름</h3>
        <div className="flex items-center justify-between gap-2 mb-3">
          <p className="flex-1 truncate text-description lg:text-content">
            {DUMMY_ROOMINFO.roomName}
          </p>
          <IconEditPen className="cursor-pointer size-5" />
        </div>
      </div>

      <div className="flex flex-col w-full">
        <h3 className="text-content lg:text-menu text-blue-dark03">메모</h3>
        <div className="flex items-center justify-between gap-2 mb-3">
          <p className="flex-1 truncate text-description lg:text-content">
            {DUMMY_ROOMINFO.memo}
          </p>
          <IconEditPen className="cursor-pointer size-5" />
        </div>
      </div>

      <h1 className="my-6 text-center text-subtitle lg:text-title text-tertiary">
        모임 참여 인원
      </h1>
      <ul className="max-h-[10rem] w-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full p-1">
        {DUMMY_ROOMINFO.emails.map((email) => (
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
