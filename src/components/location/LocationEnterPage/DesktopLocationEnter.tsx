import KakaoMap from '@src/components/common/kakao/KakaoMap';
import KakaoLocationPicker from '@src/components/common/kakao/KakaoLocationPicker';
import IconXmark from '@src/assets/icons/IconXmark.svg?react';
import ShareButton from '@src/components/layout/header/ShareButton';
import LocationActionButtons from '@src/components/location/LocationEnterPage/LocationActionButtons';
import { useLocationEnter } from '@src/hooks/location/useLocationEnter';

export default function DesktopLocationEnter() {
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

  return (
    <div className="grid w-full grid-cols-2 px-[7.5rem] gap-[0.9375rem] mt-[1.5625rem]">
      <div className="flex flex-col order-2 p-5 rounded-default bg-gray-light lg:order-1 lg:max-h-[calc(100vh-8rem)]">
        <h1 className="flex items-center justify-center text-title text-tertiary my-[1.5625rem]">
          모임 정보 입력
        </h1>
        <h1 className="mb-[0.375rem] ml-2 text-subtitle text-tertiary">
          내가 입력한 장소
        </h1>
        <ul
          ref={locationListRef}
          className="flex flex-col p-1 max-h-[calc(100vh-38rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full"
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
                  index === myLocationFields.length - 1 ? lastLocationRef : null
                }
                className="flex group/location relative items-center justify-between bg-white-default rounded-default mb-[0.625rem] hover:ring-1 hover:ring-gray-normal z-10"
              >
                <KakaoLocationPicker
                  InputClassName="w-full text-content bg-white-default py-[1.3125rem] truncate"
                  onSelect={(location) => handleLocationSelect(location, index)}
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
        <div className="flex items-center mb-[0.375rem] mt-4 ml-2 justify-between">
          <h1 className="text-subtitle text-tertiary">친구가 입력한 장소</h1>
          <ShareButton />
        </div>
        <div className="max-h-[calc(100vh-38rem)] mb-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full">
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
        <LocationActionButtons
          isAllMyLocationsFilled={isAllMyLocationsFilled}
          onAddLocation={handleAddLocation}
          className="mt-auto gap-[0.5rem]"
        />
      </div>
      <div className="rounded-default min-h-[calc(100vh-8rem)] order-1 lg:order-2">
        <KakaoMap coordinates={shouldShowMap ? coordinates : []} />
      </div>
    </div>
  );
}
