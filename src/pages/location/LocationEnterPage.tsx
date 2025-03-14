import { useForm, useFieldArray } from 'react-hook-form';
import KakaoLocationPicker from '@src/components/common/kakao/KakaoLocationPicker';
import { ISelectedLocation } from '@src/components/common/kakao/types';
import KakaoMap from '@src/components/common/kakao/KakaoMap';
import { useState, useRef } from 'react';
import IconXmark from '@src/assets/icons/IconXmark.svg?react';
import { useGetPlaceSearchQuery } from '../../state/queries/location/useGetPlaceSearchQuery';
import { usePlaceSaveMutation } from '@src/state/mutations/location/usePlaceSaveMutation';
import { usePlaceUpdateMutation } from '@src/state/mutations/location/usePlaceUpdateMutation';
import { usePlaceDeleteMutation } from '@src/state/mutations/location/usePlaceDeleteMutation';
import CustomToast from '@src/components/common/toast/customToast';
import { TOAST_TYPE } from '@src/types/toastType';
import { useParams } from 'react-router-dom';
import { ILocation } from '@src/types/location/placeSearchResponseType';
import { IPlaceSaveRequestType } from '@src/types/location/placeSaveRequestType';
import ShareButton from '@src/components/layout/header/ShareButton';
import BottomSheet from '@src/components/common/bottomSheet/BottomSheet';
import { useGetUserInfoQuery } from '@src/state/queries/users/useGetUserInfoQuery';
import { useLocationInitialization } from '@src/hooks/location/useLocationInitialization';
import { useAutoScroll } from '@src/hooks/location/useAutoScroll';
import LocationActionButtons from '@src/components/location/LocationEnterPage/LocationActionButtons';

interface ILocationForm {
  myLocations: IPlaceSaveRequestType[];
  friendLocations: IPlaceSaveRequestType[];
}

export default function LocationEnterPage() {
  const { roomId } = useParams();
  const lastLocationRef = useRef<HTMLLIElement>(null);
  const locationListRef = useRef<HTMLUListElement>(null);
  const [savedLocations, setSavedLocations] = useState<ILocation[]>([]);
  const [bottomSheetHeight, setBottomSheetHeight] = useState(500);

  const { data: userInfo } = useGetUserInfoQuery();
  const { data: placeSearchData } = useGetPlaceSearchQuery({
    enabled: !!roomId,
  });

  const { mutate: placeSaveMutation } = usePlaceSaveMutation(); // 장소 저장
  const { mutate: placeUpdateMutation } = usePlaceUpdateMutation(); // 장소 수정
  const { mutate: placeDeleteMutation } = usePlaceDeleteMutation(); // 장소 삭제

  const { control, setValue, watch, reset } = useForm<ILocationForm>({
    defaultValues: {
      myLocations: [],
      friendLocations: [],
    },
  });

  const {
    fields: myLocationFields,
    append: appendMyLocation,
    remove: removeMyLocation,
  } = useFieldArray({
    control,
    name: 'myLocations',
  });

  const { fields: friendLocationFields } = useFieldArray({
    control,
    name: 'friendLocations',
  });

  const myLocations = watch('myLocations');
  const friendLocations = watch('friendLocations');

  const isAllMyLocationsFilled =
    myLocations.length > 0 &&
    myLocations.every((loc) => loc.addressLat !== 0 && loc.addressLong !== 0);

  // 초기 데이터값 설정
  useLocationInitialization({
    placeSearchData,
    userInfo,
    reset,
    setSavedLocations,
  });

  // 장소 목록 자동 스크롤
  useAutoScroll({
    lastLocationRef,
    locationListRef,
    currentLocationsCount: myLocationFields.length,
    savedLocationsCount: placeSearchData?.data?.myLocations?.length || 0,
  });

  const handleLocationSelect = (location: ISelectedLocation, index: number) => {
    const { place, address } = location;

    // 현재 필드에 입력되어 있는 기존 위치 정보 가져오기
    const currentLocation = myLocations[index];

    // 새로운 위치 데이터 구성
    const newLocation = {
      siDo: address?.address.region_1depth_name || '',
      siGunGu: address?.address.region_2depth_name || '',
      roadNameAddress: place.place_name || '',
      addressLat: address?.y ? parseFloat(address.y) : 0,
      addressLong: address?.x ? parseFloat(address.x) : 0,
    };

    // 내 위치들과 친구 위치들 모두에서 중복 체크
    const isDuplicateInMyLocations = myLocations.some(
      (loc, idx) =>
        idx !== index &&
        loc.addressLat === newLocation.addressLat &&
        loc.addressLong === newLocation.addressLong,
    );

    const isDuplicateInFriendLocations = friendLocations.some(
      (loc) =>
        loc.addressLat === newLocation.addressLat &&
        loc.addressLong === newLocation.addressLong,
    );

    if (isDuplicateInMyLocations || isDuplicateInFriendLocations) {
      CustomToast({
        type: TOAST_TYPE.WARNING,
        message: '이미 등록된 장소입니다.',
      });
      return false;
    }

    // 기존 입력 위치가 savedLocations에 있는지 확인
    const existingLocation = savedLocations.find(
      (loc) =>
        loc.roadNameAddress === currentLocation.roadNameAddress &&
        loc.addressLat === currentLocation.addressLat &&
        loc.addressLong === currentLocation.addressLong,
    );

    if (existingLocation) {
      // 수정 요청
      placeUpdateMutation(
        {
          placeUpdatePayload: {
            placeId: existingLocation.placeId,
            ...newLocation,
          },
        },
        {
          onSuccess: () => {
            setValue(`myLocations.${index}.siDo`, newLocation.siDo);
            setValue(`myLocations.${index}.siGunGu`, newLocation.siGunGu);
            setValue(
              `myLocations.${index}.roadNameAddress`,
              newLocation.roadNameAddress,
            );
            setValue(`myLocations.${index}.addressLat`, newLocation.addressLat);
            setValue(
              `myLocations.${index}.addressLong`,
              newLocation.addressLong,
            );
          },
        },
      );
    } else {
      // 저장 요청
      placeSaveMutation(
        { placeSavePayload: newLocation },
        {
          onSuccess: () => {
            setValue(`myLocations.${index}.siDo`, newLocation.siDo);
            setValue(`myLocations.${index}.siGunGu`, newLocation.siGunGu);
            setValue(
              `myLocations.${index}.roadNameAddress`,
              newLocation.roadNameAddress,
            );
            setValue(`myLocations.${index}.addressLat`, newLocation.addressLat);
            setValue(
              `myLocations.${index}.addressLong`,
              newLocation.addressLong,
            );
          },
        },
      );
    }

    return true;
  };

  const handleDeleteLocation = (index: number) => {
    const locationToDelete = myLocations[index];
    const savedLocation = savedLocations.find(
      (loc) => loc.roadNameAddress === locationToDelete.roadNameAddress,
    );

    if (savedLocation) {
      placeDeleteMutation(
        { placeId: savedLocation.placeId },
        {
          onSuccess: () => {
            setSavedLocations((prev) =>
              prev.filter((loc) => loc.placeId !== savedLocation.placeId),
            );
            CustomToast({
              type: TOAST_TYPE.SUCCESS,
              message: '장소가 삭제되었습니다.',
            });
          },
        },
      );
    }
    removeMyLocation(index);
  };

  const isValidLocation = (loc: (typeof myLocations)[0]) =>
    loc.addressLat !== 0 && loc.addressLong !== 0;

  const formatLocations = (
    locations: typeof myLocations | undefined,
    isMyLocation: boolean,
  ) =>
    locations?.filter(isValidLocation).map((location) => ({
      lat: location.addressLat,
      lng: location.addressLong,
      isMyLocation,
      roadNameAddress: location.roadNameAddress,
    })) || [];

  const coordinates = [
    ...formatLocations(myLocations, true),
    ...formatLocations(friendLocations, false),
  ];

  const shouldShowMap = coordinates.length > 0;

  const handleAddLocation = () => {
    appendMyLocation({
      siDo: '',
      siGunGu: '',
      roadNameAddress: '',
      addressLat: 0,
      addressLong: 0,
    });
  };

  const getScrollAreaStyle = (bottomSheetHeight: number) => {
    const viewportHeight = window.innerHeight;
    const threshold = viewportHeight * 0.7;

    if (bottomSheetHeight <= threshold) {
      return 'max-h-[calc(100dvh-45rem)] overflow-y-auto';
    } else if (bottomSheetHeight <= viewportHeight * 0.8) {
      return 'max-h-[calc(100dvh-35rem)] overflow-y-auto';
    } else if (bottomSheetHeight <= viewportHeight * 0.9) {
      return 'max-h-[calc(100dvh-25rem)] overflow-y-auto';
    } else {
      return 'overflow-visible';
    }
  };

  return (
    <>
      <div className="hidden lg:grid w-full grid-cols-2 px-[7.5rem] gap-[0.9375rem] mt-[1.5625rem]">
        <div className="flex flex-col order-2 p-5 rounded-default bg-gray-light lg:order-1 lg:max-h-[calc(100vh-8rem)]">
          <h1 className="flex items-center justify-center text-subtitle lg:text-title text-tertiary my-[1.25rem] lg:my-[1.5625rem]">
            모임 정보 입력
          </h1>
          <h1 className="mb-1 lg:mb-[0.375rem] ml-2 text-menu lg:text-subtitle text-tertiary">
            내가 입력한 장소
          </h1>
          <ul
            ref={locationListRef}
            className="flex flex-col p-1 max-h-[calc(100vh-38rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full"
          >
            {myLocationFields.length === 0 ? (
              <li className="flex items-center justify-center py-4 text-description lg:text-content text-gray-dark">
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
                  className="flex group/location relative items-center justify-between bg-white-default rounded-default mb-[0.625rem] hover:ring-1 hover:ring-gray-normal z-10"
                >
                  <KakaoLocationPicker
                    InputClassName="w-full text-description lg:text-content bg-white-default py-[1.3125rem] truncate"
                    onSelect={(location) =>
                      handleLocationSelect(location, index)
                    }
                    defaultAddress={field.roadNameAddress}
                    usePortal={true}
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteLocation(index)}
                    className="p-1 mx-2 rounded-[0.5rem] hover:bg-gray-normal absolute right-0 group/deleteButton hidden group-hover/location:block"
                  >
                    <IconXmark className="transition-none size-4 text-gray-normal group-hover/deleteButton:text-gray-dark" />
                  </button>
                </li>
              ))
            )}
          </ul>
          <div className="flex items-center mb-1 lg:mb-[0.375rem] mt-2 lg:mt-4 ml-2 justify-between">
            <h1 className=" text-menu lg:text-subtitle text-tertiary">
              친구가 입력한 장소
            </h1>
            <ShareButton />
          </div>
          <div className="max-h-[calc(100vh-38rem)] mb-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full">
            {friendLocationFields.length === 0 ? (
              <div className="flex items-center justify-center py-4 text-description lg:text-content text-gray-dark">
                아직 친구가 장소를 입력하지 않았습니다
              </div>
            ) : (
              friendLocationFields.map((field) => (
                <div
                  key={field.id}
                  className="w-full text-description lg:text-content bg-white-default rounded-default truncate mb-[0.625rem] py-[1.3125rem] pl-[0.9375rem] cursor-not-allowed opacity-70"
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

      <div className="lg:hidden">
        <div className="fixed inset-0 top-[4.75rem]">
          <KakaoMap coordinates={shouldShowMap ? coordinates : []} />
        </div>

        <BottomSheet
          minHeight={30}
          maxHeight={90}
          initialHeight={50}
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
                className={`flex flex-col p-1 ${getScrollAreaStyle(bottomSheetHeight)} scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full transition-all duration-300 ease-in-out`}
              >
                {myLocationFields.length === 0 ? (
                  <li className="flex items-center justify-center py-4 text-description text-gray-dark">
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
                      className="flex relative items-center justify-between bg-white-default rounded-default mb-[0.625rem] ring-1 ring-gray-normal lg:ring-0 lg:hover:ring-1 lg:hover:ring-gray-normal"
                    >
                      <KakaoLocationPicker
                        InputClassName="w-full text-description bg-white-default py-[1.0625rem] truncate pr-12"
                        onSelect={(location) =>
                          handleLocationSelect(location, index)
                        }
                        defaultAddress={field.roadNameAddress}
                        usePortal={true}
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteLocation(index)}
                        className="p-1 mx-2 rounded-[0.5rem] hover:bg-gray-normal absolute right-0 lg:hidden lg:group-hover/location:block"
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
                className={`mb-2 ${getScrollAreaStyle(bottomSheetHeight)} scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full transition-all duration-300 ease-in-out`}
              >
                {friendLocationFields.length === 0 ? (
                  <div className="flex items-center justify-center py-4 text-description text-gray-dark">
                    아직 친구가 장소를 입력하지 않았습니다
                  </div>
                ) : (
                  friendLocationFields.map((field) => (
                    <div
                      key={field.id}
                      className="w-full text-description text-gray-dark truncate mb-[0.625rem] py-[1.0625rem] pl-[0.9375rem] cursor-not-allowed opacity-70 bg-gray-light rounded-default"
                    >
                      {field.roadNameAddress}
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
      </div>
    </>
  );
}
