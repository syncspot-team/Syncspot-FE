import KakaoMap from '@src/components/common/kakao/KakaoMap';
import BottomSheet from '@src/components/common/bottomSheet/BottomSheet';
import LocationActionButtons from '@src/components/location/LocationEnterPage/LocationActionButtons';
import { useState } from 'react';
import { LocationEnterProps } from '@src/pages/location/LocationEnterPage';
import MyLocationList from '@src/components/location/LocationEnterPage/MyLocationList';
import FriendLocationList from '@src/components/location/LocationEnterPage/FriendLocationList';

export default function MobileLocationEnter({
  lastLocationRef,
  locationListRef,
  myLocationFields,
  friendLocationFields,
  handleLocationSelect,
  handleDeleteLocation,
  handleAddLocation,
  isAllMyLocationsFilled,
  coordinates,
  shouldShowMap,
}: LocationEnterProps) {
  const [bottomSheetHeight, setBottomSheetHeight] = useState(500);

  const getScrollAreaStyle = (bottomSheetHeight: number) => {
    const viewportHeight = window.innerHeight;
    const threshold = viewportHeight * 0.7;

    if (bottomSheetHeight <= threshold) {
      return 'max-h-[calc(100dvh-30rem)] overflow-y-auto';
    } else if (bottomSheetHeight <= viewportHeight * 0.8) {
      return 'max-h-[calc(100dvh-20rem)] overflow-y-auto';
    } else if (bottomSheetHeight <= viewportHeight * 0.9) {
      return 'max-h-[calc(100dvh-10rem)] overflow-y-auto';
    } else {
      return 'max-h-[calc(100dvh-7rem)] overflow-y-auto';
    }
  };

  return (
    <>
      <div className="fixed inset-0 top-[4.75rem]">
        <KakaoMap coordinates={shouldShowMap ? coordinates : []} />
      </div>

      <BottomSheet
        minHeight={60}
        maxHeight={90}
        initialHeight={60}
        headerHeight={40}
        onHeightChange={(height) => setBottomSheetHeight(height)}
      >
        <div className="flex flex-col h-full">
          <h1 className="flex items-center justify-center my-4 text-subtitle text-tertiary">
            모임 정보 입력
          </h1>
          <div className="flex-1 px-4 overflow-y-auto">
            <h1 className="mb-1 ml-2 text-menu text-tertiary">
              내가 입력한 장소
            </h1>
            <MyLocationList
              locationListRef={locationListRef}
              lastLocationRef={lastLocationRef}
              locations={myLocationFields}
              onLocationSelect={handleLocationSelect}
              onDeleteLocation={handleDeleteLocation}
              className={`flex flex-col p-1 ${getScrollAreaStyle(bottomSheetHeight)} scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full transition-all duration-300 ease-in-out`}
            />

            <h1 className="mt-2 mb-1 ml-2 text-menu text-tertiary">
              친구가 입력한 장소
            </h1>
            <FriendLocationList
              locations={friendLocationFields}
              className={`mb-2 ${getScrollAreaStyle(bottomSheetHeight)} scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full transition-all duration-300 ease-in-out`}
            />
          </div>

          <LocationActionButtons
            isAllMyLocationsFilled={isAllMyLocationsFilled}
            handleAddLocation={handleAddLocation}
            className="px-4 py-6 bg-white-default"
          />
        </div>
      </BottomSheet>
    </>
  );
}
