import KakaoLocationPicker from '@src/components/common/kakao/KakaoLocationPicker';
import IconXmark from '@src/assets/icons/IconXmark.svg?react';
import { useLocationContext } from '@src/components/location/LocationEnterPage/LocationContext';

interface MyLocationListProps {
  className?: string;
}

export default function MyLocationList({ className }: MyLocationListProps) {
  const {
    locationListRef,
    lastLocationRef,
    myLocationFields,
    handleLocationSelect,
    handleDeleteLocation,
  } = useLocationContext();

  return (
    <ul ref={locationListRef} className={className}>
      {myLocationFields.map((location, index) => (
        <li
          key={location.id}
          ref={index === myLocationFields.length - 1 ? lastLocationRef : null}
          className="relative mb-2 rounded-md"
        >
          <KakaoLocationPicker
            InputClassName="w-full bg-white-default ring-1 ring-gray-normal lg:py-[1.25rem] text-description lg:text-content"
            onSelect={(selectedLocation) =>
              handleLocationSelect(selectedLocation, index)
            }
            defaultAddress={location.roadNameAddress}
          />
          <button
            onClick={() => handleDeleteLocation(index)}
            className="absolute p-1 transform -translate-y-1/2 rounded-full right-2 top-1/2 hover:bg-gray-light"
          >
            <IconXmark className="size-3 lg:size-4 text-gray-dark" />
          </button>
        </li>
      ))}
    </ul>
  );
}
