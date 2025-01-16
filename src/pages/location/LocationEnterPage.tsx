import { useForm, useFieldArray } from 'react-hook-form';
import KakaoLocationPicker from '@src/components/common/kakao/KakaoLocationPicker';
import { ISelectedLocation } from '@src/components/common/kakao/types';
import SearchButton from '@src/components/common/button/SearchButton';
import AddButton from '@src/components/common/button/AddButton';
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

interface ILocationForm {
  myLocations: {
    siDo: string;
    siGunGu: string;
    roadNameAddress: string;
    addressLat: number;
    addressLong: number;
  }[];
  friendLocations: {
    siDo: string;
    siGunGu: string;
    roadNameAddress: string;
    addressLat: number;
    addressLong: number;
  }[];
}

interface ISavedLocation {
  placeId: number;
  siDo: string;
  siGunGu: string;
  roadNameAddress: string;
  addressLat: number;
  addressLong: number;
}

// const DUMMY_LOCATIONS = {
//   myLocations: [
//     {
//       siDo: '서울특별시',
//       siGunGu: '강남구',
//       roadNameAddress: '테헤란로 427',
//       addressLat: 37.5065,
//       addressLong: 127.0536,
//     },
//     {
//       siDo: '서울특별시',
//       siGunGu: '서초구',
//       roadNameAddress: '강남대로 373',
//       addressLat: 37.4969,
//       addressLong: 127.0278,
//     },
//   ],
//   friendLocations: [
//     {
//       siDo: '서울특별시',
//       siGunGu: '마포구',
//       roadNameAddress: '월드컵북로 396',
//       addressLat: 37.5826,
//       addressLong: 126.9012,
//     },
//     {
//       siDo: '서울특별시',
//       siGunGu: '용산구',
//       roadNameAddress: '이태원로 217',
//       addressLat: 37.5384,
//       addressLong: 126.9946,
//     },
//   ],
// };

export default function LocationEnterPage() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [savedLocations, setSavedLocations] = useState<ISavedLocation[]>([]);

  // 장소 목록 조회 쿼리
  const { data: placeSearchData } = useGetPlaceSearchQuery();

  const { control, setValue, watch } = useForm<ILocationForm>({
    defaultValues: {
      myLocations: [],
      friendLocations: [],
    },
  });

  // placeSearchData가 로드되면 폼 값을 업데이트
  useEffect(() => {
    if (placeSearchData?.data) {
      setSavedLocations(placeSearchData.data.myLocations);

      // myLocations 업데이트
      setValue(
        'myLocations',
        placeSearchData.data.myLocations.map((place) => ({
          siDo: place.siDo,
          siGunGu: place.siGunGu,
          roadNameAddress: place.roadNameAddress,
          addressLat: place.addressLat,
          addressLong: place.addressLong,
        })),
      );

      // friendLocations 업데이트
      setValue(
        'friendLocations',
        placeSearchData.data.friendLocations.map((place) => ({
          siDo: place.siDo,
          siGunGu: place.siGunGu,
          roadNameAddress: place.roadNameAddress,
          addressLat: place.addressLat,
          addressLong: place.addressLong,
        })),
      );
    }
  }, [placeSearchData?.data, setValue]);

  // 장소 저장 mutation
  const { mutate: placeSaveMutation } = usePlaceSaveMutation();

  // 장소 수정 mutation
  const { mutate: placeUpdateMutation } = usePlaceUpdateMutation();

  // 장소 삭제 mutation
  const { mutate: placeDeleteMutation, isSuccess: isPlaceDeleteSuccess } =
    usePlaceDeleteMutation();

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

    // 중복 장소 체크
    const isDuplicate = savedLocations.some(
      (loc) => loc.roadNameAddress === newLocation.roadNameAddress,
    );

    if (isDuplicate) {
      CustomToast({
        type: TOAST_TYPE.WARNING,
        message: '이미 등록된 장소입니다.',
      });
      return false;
    }

    // form 값 업데이트
    setValue(`myLocations.${index}.siDo`, newLocation.siDo);
    setValue(`myLocations.${index}.siGunGu`, newLocation.siGunGu);
    setValue(
      `myLocations.${index}.roadNameAddress`,
      newLocation.roadNameAddress,
    );
    setValue(`myLocations.${index}.addressLat`, newLocation.addressLat);
    setValue(`myLocations.${index}.addressLong`, newLocation.addressLong);

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
            // savedLocations 업데이트
            setSavedLocations((prev) =>
              prev.map((loc) =>
                loc.placeId === existingLocation.placeId
                  ? { ...newLocation, placeId: existingLocation.placeId }
                  : loc,
              ),
            );
          },
        },
      );
    } else {
      // 저장 요청
      placeSaveMutation(
        {
          placeSavePayload: newLocation,
        },
        {
          onSuccess: (response) => {
            // 새로운 placeId로 savedLocations 업데이트
            setSavedLocations((prev) => [
              ...prev,
              { ...newLocation, placeId: response.data.placeId },
            ]);
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
      placeDeleteMutation({
        placeId: savedLocation.placeId,
      });
      setSavedLocations((prev) =>
        prev.filter((loc) => loc.placeId !== savedLocation.placeId),
      );
    }
    removeMyLocation(index);

    if (isPlaceDeleteSuccess) {
      CustomToast({
        type: TOAST_TYPE.SUCCESS,
        message: '장소가 삭제되었습니다.',
      });
    }
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

  const handleSearch = () => {
    navigate(PATH.LOCATION_RESULT(roomId!));
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
          {myLocationFields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center justify-between bg-white-default rounded-default mb-[0.625rem] hover:opacity-55 hover:border hover:border-gray-dark"
            >
              <KakaoLocationPicker
                className="flex-1 text-left whitespace-nowrap"
                onSelect={(location) => handleLocationSelect(location, index)}
                defaultAddress={field.roadNameAddress}
              />
              <button
                type="button"
                onClick={() => handleDeleteLocation(index)}
                className="p-2 mx-2 rounded-default hover:bg-gray-dark"
              >
                <IconXmark className="size-5" />
              </button>
            </div>
          ))}
          <h1 className="text-subtitle text-tertiary my-[0.75rem]">
            친구가 입력한 장소
          </h1>
          {friendLocationFields.map((field) => (
            <div
              key={field.id}
              className="w-full text-left bg-white-default rounded-default whitespace-nowrap mb-[0.625rem] py-[1.3125rem] px-[1.5rem] cursor-not-allowed opacity-70"
            >
              {field.roadNameAddress || '위치 정보 없음'}
            </div>
          ))}
        </div>

        <div className="flex flex-col mt-[1.75rem] gap-[0.5rem]">
          <AddButton
            onClick={handleAddLocation}
            buttonText="장소 추가하기"
            className="w-full px-[0.3125rem]"
          />
          <SearchButton
            onClick={handleSearch}
            buttonText="중간 지점 찾기"
            disabled={!isAllMyLocationsFilled}
            className="w-full px-[0.3125rem]"
          />
        </div>
      </div>
      <div className="rounded-default min-h-[31.25rem] order-1 lg:order-2">
        <KakaoMap coordinates={coordinates} />
      </div>
    </div>
  );
}
