import KakaoLocationPicker from '@src/components/common/kakao/KakaoLocationPicker';
import IconXmark from '@src/assets/icons/IconXmark.svg?react';
import { ISelectedLocation } from '@src/components/common/kakao/types';

interface ILocationField {
  id: string;
  siDo: string;
  siGunGu: string;
  roadNameAddress: string;
  addressLat: number;
  addressLong: number;
}

interface MyLocationListProps {
  locationListRef: React.RefObject<HTMLUListElement>;
  lastLocationRef: React.RefObject<HTMLLIElement>;
  locations: ILocationField[];
  onLocationSelect: (location: ISelectedLocation, index: number) => boolean;
  onDeleteLocation: (index: number) => void;
  className?: string;
}

export default function MyLocationList({
  locationListRef,
  lastLocationRef,
  locations,
  onLocationSelect,
  onDeleteLocation,
  className,
}: MyLocationListProps) {
  if (locations.length === 0) {
    return (
      <li className="flex items-center justify-center py-4 text-content text-gray-dark">
        아래 장소 추가하기 버튼을 클릭해 장소를 추가해보세요!
      </li>
    );
  }

  return (
    <ul ref={locationListRef} className={className}>
      {locations.map((field, index) => (
        <li
          key={field.id}
          ref={index === locations.length - 1 ? lastLocationRef : null}
          className="flex group/location relative items-center justify-between bg-white-default rounded-default mb-[0.625rem] ring-1 ring-gray-normal z-10"
        >
          <KakaoLocationPicker
            InputClassName="w-full text-content bg-white-default py-[1.3125rem] truncate"
            onSelect={(location) => onLocationSelect(location, index)}
            defaultAddress={field.roadNameAddress}
            usePortal={true}
          />
          <button
            type="button"
            onClick={() => onDeleteLocation(index)}
            className="p-1 mx-2 rounded-[0.5rem] hover:bg-gray-normal absolute right-0 group"
          >
            <IconXmark className="transition-none size-4 text-gray-normal group-hover:text-white-default" />
          </button>
        </li>
      ))}
    </ul>
  );
}
