import KakaoMap from '@src/components/common/kakao/KakaoMap';
import KakaoLocationPicker from '@src/components/common/kakao/KakaoLocationPicker';
import IconXmark from '@src/assets/icons/IconXmark.svg?react';
import BottomSheet from '@src/components/common/bottomSheet/BottomSheet';
import LocationActionButtons from '@src/components/location/LocationEnterPage/LocationActionButtons';
import { useState } from 'react';
import { useLocationEnter } from '@src/hooks/location/useLocationEnter';

export default function MobileLocationEnter() {
  const [bottomSheetHeight, setBottomSheetHeight] = useState(500);
  const {
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
  } = useLocationEnter();

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
            <ul
              ref={locationListRef}
              className={`flex flex-col p-1 ${getScrollAreaStyle(
                bottomSheetHeight,
              )} scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full transition-all duration-300 ease-in-out`}
            >
              {myLocationFields.length === 0 ? (
                <li className="flex items-center justify-center py-4 text-content text-gray-dark">
                  아래 장소 추가하기 버튼을 클릭해 장소를 추가해보세요!
                </li>
              ) : (
                myLocationFields.map((field, index) => (
                  <li
                    key={field.id}
                    ref={
                      index === myLocationFields.length - 1
                        ? lastLocationRef
                        : null
                    }
                    className="flex group/location relative items-center justify-between bg-white-default rounded-default mb-[0.625rem] ring-1 ring-gray-normal z-10"
                  >
                    <KakaoLocationPicker
                      InputClassName="w-full text-content bg-white-default py-[1.3125rem] truncate"
                      onSelect={(location) =>
                        handleLocationSelect(location, index)
                      }
                      defaultAddress={field.roadNameAddress}
                      usePortal={true}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteLocation(index)}
                      className="p-1 mx-2 rounded-[0.5rem] hover:bg-gray-normal absolute right-0 hidden group-hover/location:block"
                    >
                      <IconXmark className="transition-none size-4 text-gray-normal group-hover/deleteButton:text-gray-dark" />
                    </button>
                  </li>
                ))
              )}
            </ul>

            <h1 className="mt-2 mb-1 ml-2 text-menu text-tertiary">
              친구가 입력한 장소
            </h1>
            <div
              className={`mb-2 ${getScrollAreaStyle(
                bottomSheetHeight,
              )} scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full transition-all duration-300 ease-in-out`}
            >
              {friendLocationFields.length === 0 ? (
                <div className="flex items-center justify-center py-4 text-content text-gray-dark">
                  아직 친구가 장소를 입력하지 않았습니다
                </div>
              ) : (
                friendLocationFields.map((field) => (
                  <div
                    key={field.id}
                    className="w-full text-content bg-white-default rounded-default truncate mb-[0.625rem] py-[1.3125rem] pl-[0.9375rem] cursor-not-allowed opacity-70"
                  >
                    {field.roadNameAddress || '위치 정보 없음'}
                  </div>
                ))
              )}
            </div>
          </div>

          <LocationActionButtons
            isAllMyLocationsFilled={isAllMyLocationsFilled}
            onAddLocation={handleAddLocation}
            className="px-4 py-6 bg-white-default"
          />
        </div>
      </BottomSheet>
    </>
  );
}
