interface RoomListItemProps {
  roomId: string;
  roomName: string;
  onSelect: (roomId: string, roomName: string) => void;
}

export default function RoomListItem({
  roomId,
  roomName,
  onSelect,
}: RoomListItemProps) {
  return (
    <li
      className="p-2 truncate cursor-pointer lg:px-3 text-description lg:text-content hover:bg-gray-light rounded-[0.25rem]"
      onClick={() => onSelect(roomId, roomName)}
    >
      {roomName}
    </li>
  );
}
