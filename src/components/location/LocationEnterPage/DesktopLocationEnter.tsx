import KakaoMap from '@src/components/common/kakao/KakaoMap';
import ShareButton from '@src/components/layout/header/ShareButton';
import LocationActionButtons from '@src/components/location/LocationEnterPage/LocationActionButtons';
import FriendLocationList from '@src/components/location/LocationEnterPage/FriendLocationList';
import MyLocationList from '@src/components/location/LocationEnterPage/MyLocationList';
import { useLocationContext } from '@src/components/location/LocationEnterPage/LocationContext';

export default function DesktopLocationEnter() {
  const { coordinates, shouldShowMap } = useLocationContext();

  return (
    <div className="grid w-full grid-cols-2 px-[7.5rem] gap-[0.9375rem] mt-[1.5625rem]">
      <div className="flex flex-col order-2 p-5 rounded-default bg-gray-light lg:order-1 lg:max-h-[calc(100vh-8rem)]">
        <h1 className="flex items-center justify-center text-title text-tertiary my-[1.5625rem]">
          모임 정보 입력
        </h1>
        <h1 className="mb-[0.375rem] ml-2 text-subtitle text-tertiary">
          내가 입력한 장소
        </h1>
        <MyLocationList className="flex flex-col p-1 max-h-[calc(100vh-38rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full" />
        <div className="flex items-center mb-[0.375rem] mt-4 ml-2 justify-between">
          <h1 className="text-subtitle text-tertiary">친구가 입력한 장소</h1>
          <ShareButton />
        </div>
        <FriendLocationList className="max-h-[calc(100vh-38rem)] mb-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full p-1" />
        <LocationActionButtons className="mt-auto gap-[0.5rem]" />
      </div>
      <div className="rounded-default min-h-[calc(100vh-8rem)] order-1 lg:order-2">
        <KakaoMap coordinates={shouldShowMap ? coordinates : []} />
      </div>
    </div>
  );
}
