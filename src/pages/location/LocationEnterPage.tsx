import { useForm, useFieldArray } from 'react-hook-form';
import KakaoLocationPicker from '@src/components/common/kakao/KakaoLocationPicker';
import { ISelectedLocation } from '@src/components/common/kakao/types';
import Button from '@src/components/common/button/Button';
import KakaoMap from '@src/components/common/kakao/KakaoMap';
import { useMemo, useState, useEffect } from 'react';
import IconXmark from '@src/assets/icons/IconXmark.svg?react';
import { useGetPlaceSearchQuery } from '../../state/queries/location/useGetPlaceSearchQuery';
import { usePlaceSaveMutation } from '@src/state/mutations/location/usePlaceSaveMutation';
import { usePlaceUpdateMutation } from '@src/state/mutations/location/usePlaceUpdateMutation';
import { usePlaceDeleteMutation } from '@src/state/mutations/location/usePlaceDeleteMutation';
import CustomToast from '@src/components/common/toast/customToast';
import { TOAST_TYPE } from '@src/types/toastType';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '@src/constants/path';
import { ILocation } from '@src/types/location/placeSearchResponseType';
import { useQueryClient } from '@tanstack/react-query';
import { LOCATION_KEY } from '@src/state/queries/location/key';
import { IPlaceSaveRequestType } from '@src/types/location/placeSaveRequestType';

interface ILocationForm {
  myLocations: IPlaceSaveRequestType[];
  friendLocations: IPlaceSaveRequestType[];
}

export default function LocationEnterPage() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [savedLocations, setSavedLocations] = useState<ILocation[]>([]);

  // 장소 목록 조회 쿼리
  const { data: placeSearchData } = useGetPlaceSearchQuery();

  const { mutate: placeSaveMutation } = usePlaceSaveMutation();
  const { mutate: placeUpdateMutation } = usePlaceUpdateMutation();
  const { mutate: placeDeleteMutation } = usePlaceDeleteMutation();

  const { control, setValue, watch, reset } = useForm<ILocationForm>({
    defaultValues: {
      myLocations: [],
      friendLocations: [],
    },
  });

  // placeSearchData가 로드되면 폼 값을 업데이트
  useEffect(() => {
    if (placeSearchData?.data) {
      setSavedLocations(placeSearchData.data.myLocations);

      reset({
        myLocations: placeSearchData.data.myLocations.map(
          (place: ILocation) => ({
            siDo: place.siDo,
            siGunGu: place.siGunGu,
            roadNameAddress: place.roadNameAddress,
            addressLat: place.addressLat,
            addressLong: place.addressLong,
          }),
        ),
        friendLocations: placeSearchData.data.friendLocations.map(
          (place: ILocation) => ({
            siDo: place.siDo,
            siGunGu: place.siGunGu,
            roadNameAddress: place.roadNameAddress,
            addressLat: place.addressLat,
            addressLong: place.addressLong,
          }),
        ),
      });
    }
  }, [placeSearchData?.data, reset]);

  const queryClient = useQueryClient();

  const myLocations = watch('myLocations');
  const friendLocations = watch('friendLocations');

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

  const isAllMyLocationsFilled = myLocations?.every(
    (loc) => loc.addressLat !== 0 && loc.addressLong !== 0,
  );

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

    // 현재 수정 중인 위치를 제외한 다른 위치들 중에서 중복 체크
    const isDuplicate = myLocations.some(
      (loc, idx) =>
        idx !== index &&
        loc.addressLat === newLocation.addressLat &&
        loc.addressLong === newLocation.addressLong,
    );

    if (isDuplicate) {
      CustomToast({
        type: TOAST_TYPE.WARNING,
        message: '이미 등록된 장소입니다.',
      });
      return false;
    }

    // 기존 입력 위치가 savedLocations에 있는지 확인
    const existingLocation = savedLocations.find(
      (loc) => loc.roadNameAddress === currentLocation.roadNameAddress,
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
            queryClient
              .invalidateQueries({
                queryKey: LOCATION_KEY.GET_PLACE_SEARCH(roomId!),
              })
              .then(() => {
                // form 값 업데이트
                setValue(`myLocations.${index}.siDo`, newLocation.siDo);
                setValue(`myLocations.${index}.siGunGu`, newLocation.siGunGu);
                setValue(
                  `myLocations.${index}.roadNameAddress`,
                  newLocation.roadNameAddress,
                );
                setValue(
                  `myLocations.${index}.addressLat`,
                  newLocation.addressLat,
                );
                setValue(
                  `myLocations.${index}.addressLong`,
                  newLocation.addressLong,
                );
              });
          },
        },
      );
    } else {
      // 저장 요청
      placeSaveMutation(
        { placeSavePayload: newLocation },
        {
          onSuccess: () => {
            queryClient
              .invalidateQueries({
                queryKey: LOCATION_KEY.GET_PLACE_SEARCH(roomId!),
              })
              .then(() => {
                // form 값 업데이트
                setValue(`myLocations.${index}.siDo`, newLocation.siDo);
                setValue(`myLocations.${index}.siGunGu`, newLocation.siGunGu);
                setValue(
                  `myLocations.${index}.roadNameAddress`,
                  newLocation.roadNameAddress,
                );
                setValue(
                  `myLocations.${index}.addressLat`,
                  newLocation.addressLat,
                );
                setValue(
                  `myLocations.${index}.addressLong`,
                  newLocation.addressLong,
                );
              });
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
            queryClient.invalidateQueries({
              queryKey: LOCATION_KEY.GET_PLACE_SEARCH(roomId!),
            });
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

  const coordinates = useMemo(() => {
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

    return [
      ...formatLocations(myLocations, true),
      ...formatLocations(friendLocations, false),
    ];
  }, [
    JSON.stringify(myLocations?.filter(isValidLocation)),
    JSON.stringify(friendLocations?.filter(isValidLocation)),
  ]);

  const handleAddLocation = () => {
    appendMyLocation({
      siDo: '',
      siGunGu: '',
      roadNameAddress: '',
      addressLat: 0,
      addressLong: 0,
    });
  };

  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-2 px-4 lg:px-[7.5rem] gap-[0.9375rem] mt-[1.875rem]">
      <div className="flex flex-col justify-center order-2 p-5 rounded-default bg-gray-light lg:order-1">
        <h1 className="flex items-center justify-center text-title text-tertiary my-[2.5rem]">
          모임 정보 입력
        </h1>

        <div className="max-h-[31.25rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full">
          <h1 className="text-subtitle text-tertiary mb-[0.75rem]">
            내가 입력한 장소
          </h1>
          <ul className="flex flex-col p-1">
            {myLocationFields.map((field, index) => (
              <li
                className="flex relative items-center justify-between bg-white-default rounded-default mb-[0.625rem] hover:ring-1 hover:ring-gray-dark [&:not(:last-child)]:z-[2] last:z-[1]"
                key={field.id}
              >
                <KakaoLocationPicker
                  className="w-full text-content bg-white-default py-[1.3125rem] truncate"
                  onSelect={(location) => handleLocationSelect(location, index)}
                  defaultAddress={field.roadNameAddress}
                />
                <button
                  type="button"
                  onClick={() => handleDeleteLocation(index)}
                  className="p-1 mx-2 rounded-[0.5rem] hover:bg-gray-normal absolute right-0"
                >
                  <IconXmark className="size-4" />
                </button>
              </li>
            ))}
          </ul>
          <h1 className="text-subtitle text-tertiary my-[0.75rem]">
            친구가 입력한 장소
          </h1>
          {friendLocationFields.map((field) => (
            <div
              key={field.id}
              className="w-full text-content bg-white-default rounded-default truncate mb-[0.625rem] py-[1.3125rem] pl-[0.9375rem] cursor-not-allowed opacity-70"
            >
              {field.roadNameAddress || '위치 정보 없음'}
            </div>
          ))}
        </div>

        <div className="flex flex-col mt-[1.75rem] gap-[0.5rem]">
          <Button
            buttonType="secondary"
            onClick={handleAddLocation}
            className="px-[0.3125rem] w-full"
          >
            장소 추가하기
          </Button>
          <Button
            buttonType="primary"
            onClick={() => navigate(PATH.LOCATION_RESULT(roomId!))}
            disabled={!isAllMyLocationsFilled}
            className="px-[0.3125rem] w-full"
          >
            중간 지점 찾기
          </Button>
        </div>
      </div>
      <div className="rounded-default min-h-[31.25rem] lg:min-h-[calc(100vh-8rem)] order-1 lg:order-2">
        <KakaoMap coordinates={coordinates} />
      </div>
    </div>
  );
}
