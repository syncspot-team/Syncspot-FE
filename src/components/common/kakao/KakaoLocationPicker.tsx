import { useState } from 'react';
import { searchAddressInfo } from '@src/apis/kakao/searchAddressInfo';
import KakaoLocationModal from '@src/components/common/modal/KakaoLocationModal';
import KakaoLocationSearch from '@src/components/common/kakao/KakaoLocationSearch';
import { Place, ISelectedLocation } from '@src/components/common/kakao/types';
import { mergeClassNames } from '@src/utils/mergeClassNames';

interface IKakaoLocationPicker {
  className?: string;
  onSelect?: (location: ISelectedLocation) => boolean;
  defaultAddress?: string;
}

export default function KakaoLocationPicker({
  className,
  onSelect,
  defaultAddress,
}: IKakaoLocationPicker) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<ISelectedLocation | null>(null);

  const handlePlaceSelect = async (place: Place) => {
    const addressData = await searchAddressInfo(place.road_address_name);
    const location = { place, address: addressData };
    const selectResult = onSelect?.(location);
    if (selectResult !== false) {
      setSelectedLocation(location);
    }

    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={mergeClassNames(
          'cursor-pointer py-[1.3125rem] px-[1.5rem] rounded-default',
          className,
          !selectedLocation && !defaultAddress && 'text-gray-normal',
        )}
      >
        {selectedLocation
          ? selectedLocation.place.place_name
          : defaultAddress || '장소를 선택해주세요'}
      </button>

      <KakaoLocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <KakaoLocationSearch onPlaceSelect={handlePlaceSelect} />
      </KakaoLocationModal>
    </>
  );
}
