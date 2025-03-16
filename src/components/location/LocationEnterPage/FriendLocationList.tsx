interface ILocationField {
  id: string;
  siDo: string;
  siGunGu: string;
  roadNameAddress: string;
  addressLat: number;
  addressLong: number;
}

interface FriendLocationListProps {
  locations: ILocationField[];
  className?: string;
}

export default function FriendLocationList({
  locations,
  className,
}: FriendLocationListProps) {
  if (locations.length === 0) {
    return (
      <div className="flex items-center justify-center py-4 text-content text-gray-dark">
        아직 친구가 장소를 입력하지 않았습니다
      </div>
    );
  }

  return (
    <div className={className}>
      {locations.map((field) => (
        <div
          key={field.id}
          className="w-full text-content bg-white-default rounded-default truncate mb-[0.625rem] py-[1.3125rem] pl-[0.9375rem] cursor-not-allowed opacity-70"
        >
          {field.roadNameAddress || '위치 정보 없음'}
        </div>
      ))}
    </div>
  );
}
