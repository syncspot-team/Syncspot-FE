interface IRoomInfo {
  roomId: string;
  roomName: string;
}

interface IRoomInfoProps {
  room: IRoomInfo;
  onClose: () => void;
}

export default function RoomInfo({ room, onClose }: IRoomInfoProps) {
  return (
    <div className="flex w-[50rem] gap-2">
      <div className="w-full">
        <h2 className="mb-4 text-title text-tertiary">모임 정보</h2>
        <div className="mb-4">
          <p className="text-menu text-tertiary">모임 이름: {room.roomName}</p>
          <p className="text-menu text-tertiary">모임 ID: {room.roomId}</p>
        </div>
        <button
          onClick={onClose}
          className="w-full py-2 bg-primary text-white-default rounded-default hover:bg-secondary"
        >
          닫기
        </button>
      </div>
      <div className="w-full">
        <h2 className="mb-4 text-title text-tertiary">모임 참여 인원</h2>
        <div className="mb-4">
          <p className="text-menu text-tertiary">모임 이름: {room.roomName}</p>
          <p className="text-menu text-tertiary">모임 ID: {room.roomId}</p>
        </div>
        <button
          onClick={onClose}
          className="w-full py-2 bg-primary text-white-default rounded-default hover:bg-secondary"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
