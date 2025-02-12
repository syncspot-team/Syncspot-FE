import { useForm, useFieldArray } from 'react-hook-form';
import KakaoLocationPicker from '@src/components/common/kakao/KakaoLocationPicker';
import { ISelectedLocation } from '@src/components/common/kakao/types';
import KakaoMap from '@src/components/common/kakao/KakaoMap';
import { useMemo, useEffect, useRef } from 'react';
import IconXmark from '@src/assets/icons/IconXmark.svg?react';
import Button from '@src/components/common/button/Button';
import { useMidpointSearchQuery } from '@src/state/queries/location/useMidpointSearchQuery';
import { useGetPlaceVoteRoomCheckQuery } from '@src/state/queries/place/useGetPlaceVoteRoomCheckQuery';
import { usePlaceVoteRoomCreateMutation } from '@src/state/mutations/place/usePlaceVoteRoomCreateMutation';
import { usePlaceVoteRoomUpdateMutation } from '@src/state/mutations/place/usePlaceVoteRoomUpdateMutation';
import { IPlaceVoteRoomCheckResponseCandidate } from '@src/types/place/placeVoteRoomCheckResponseType';
import { IMidpointDataResponseType } from '@src/types/location/midpointSearchResponseType';
import { TOAST_TYPE } from '@src/types/toastType';
import CustomToast from '@src/components/common/toast/customToast';
import SomethingWrongErrorPage from '@src/pages/error/SomethingWrongErrorPage';
import { useGetPlaceSearchQuery } from '@src/state/queries/location/useGetPlaceSearchQuery';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '@src/constants/path';

interface ILocationFormItem
  extends Omit<IPlaceVoteRoomCheckResponseCandidate, 'id'> {
  id?: number;
}

interface ILocationForm {
  locations: ILocationFormItem[];
}

export default function PlaceCreatePage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const lastLocationRef = useRef<HTMLLIElement>(null);

  const { data: placeVoteRoomCheckData } = useGetPlaceVoteRoomCheckQuery();
  const { data: placeSearchData } = useGetPlaceSearchQuery({
    enabled: !placeVoteRoomCheckData?.data.existence,
  });
  const { data: midpointSearchData } = useMidpointSearchQuery({
    enabled:
      placeSearchData?.data?.myLocationExistence ||
      placeSearchData?.data?.friendLocationExistence,
  });

  const { mutate: placeVoteRoomCreateMutation } =
    usePlaceVoteRoomCreateMutation();
  const { mutate: placeVoteRoomUpdateMutation } =
    usePlaceVoteRoomUpdateMutation();

  const { control, reset, watch } = useForm<ILocationForm>({
    defaultValues: {
      locations: [],
    },
  });

  const locations = watch('locations');

  const {
    fields: locationFields,
    append: appendLocation,
    remove: removeLocation,
  } = useFieldArray({
    control,
    name: 'locations',
  });

  // 초기 데이터 설정
  useEffect(() => {
    if (!placeVoteRoomCheckData) return;

    if (placeVoteRoomCheckData.data.existence) {
      const candidates = placeVoteRoomCheckData.data.placeCandidates;
      reset({
        locations: candidates.map(
          (candidate: IPlaceVoteRoomCheckResponseCandidate) => ({
            id: candidate.id,
            siDo: candidate.siDo,
            siGunGu: candidate.siGunGu,
            roadNameAddress: candidate.roadNameAddress,
            addressLat: candidate.addressLat,
            addressLong: candidate.addressLong,
            name: candidate.roadNameAddress,
          }),
        ),
      });
    } else if (midpointSearchData?.data) {
      reset({
        locations: midpointSearchData.data.map(
          (place: IMidpointDataResponseType) => ({
            siDo: place.siDo,
            siGunGu: place.siGunGu,
            roadNameAddress: place.name,
            addressLat: place.addressLat,
            addressLong: place.addressLong,
            name: place.name,
          }),
        ),
      });
    }
  }, [placeVoteRoomCheckData, midpointSearchData, reset]);

  useEffect(() => {
    if (lastLocationRef.current) {
      lastLocationRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [locationFields.length]);

  const handleLocationSelect = (location: ISelectedLocation, index: number) => {
    const { place, address } = location;

    const isDuplicate = locations.some(
      (loc, i) =>
        i !== index &&
        loc.addressLat === parseFloat(address?.y || '0') &&
        loc.addressLong === parseFloat(address?.x || '0'),
    );

    if (isDuplicate) {
      CustomToast({
        type: TOAST_TYPE.WARNING,
        message: '이미 등록된 장소입니다.',
      });
      return false;
    }

    const newLocation = {
      siDo: address?.address.region_1depth_name || '',
      siGunGu: address?.address.region_2depth_name || '',
      roadNameAddress: place.place_name || '',
      addressLat: address?.y ? parseFloat(address.y) : 0,
      addressLong: address?.x ? parseFloat(address.x) : 0,
      name: place.place_name || '',
    };

    const newLocations = [...locations];
    newLocations[index] = newLocation;
    reset({ locations: newLocations });

    return true;
  };

  const isValidLocation = (loc: (typeof locations)[0]) =>
    loc.addressLat !== 0 && loc.addressLong !== 0;

  const isAllLocationsFilled =
    locations.length > 0 && locations.every(isValidLocation);

  const coordinates = useMemo(() => {
    return locations.filter(isValidLocation).map((location) => ({
      lat: location.addressLat,
      lng: location.addressLong,
      roadNameAddress: location.roadNameAddress,
      isMyLocation: false,
    }));
  }, [locations]);

  const handleVoteCreate = () => {
    const payload = {
      placeCandidates: locations.map((location) => ({
        siDo: location.siDo,
        siGunGu: location.siGunGu,
        roadNameAddress: location.roadNameAddress,
        addressLat: location.addressLat,
        addressLong: location.addressLong,
        name: location.roadNameAddress,
      })),
    };

    if (placeVoteRoomCheckData?.data.existence) {
      placeVoteRoomUpdateMutation(payload, {
        onSuccess: () => {
          navigate(PATH.PLACE_VOTE(roomId));
        },
      });
    } else {
      placeVoteRoomCreateMutation(payload, {
        onSuccess: () => {
          navigate(PATH.PLACE_VOTE(roomId));
        },
      });
    }
  };

  if (!midpointSearchData?.data) {
    return <SomethingWrongErrorPage />;
  }

  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-2 px-4 lg:px-[7.5rem] gap-[0.9375rem] mt-[1.875rem]">
      <div className="flex flex-col order-2 p-5 rounded-default bg-gray-light lg:order-1 lg:max-h-[calc(100vh-8rem)]">
        <h1 className="flex items-center justify-center text-subtitle lg:text-title text-tertiary my-[1.25rem] lg:my-[1.5625rem]">
          모임 장소 투표 생성 하기
        </h1>
        <div className="hidden lg:flex flex-col items-center text-content text-gray-dark mb-[1.25rem]">
          <span>우리 같이 투표해요!</span>
          <span>원하는 모임 장소를 선택한 후 투표를 진행하세요!</span>
        </div>
        <ul className="flex flex-col mb-5 max-h-[calc(100vh-25rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full p-1">
          {locationFields.map((field, index) => (
            <li
              key={field.id}
              ref={index === locationFields.length - 1 ? lastLocationRef : null}
              className="flex group/location relative items-center justify-between bg-white-default rounded-default mb-[0.625rem] hover:ring-1 hover:ring-gray-normal z-10"
            >
              <KakaoLocationPicker
                InputClassName="w-full text-description lg:text-content bg-white-default py-[1.3125rem] truncate"
                onSelect={(location) => handleLocationSelect(location, index)}
                defaultAddress={locations[index]?.roadNameAddress}
              />
              <button
                type="button"
                onClick={() => removeLocation(index)}
                className="p-1 mx-2 rounded-[0.5rem] hover:bg-gray-normal absolute right-0 group/deleteButton hidden group-hover/location:block"
              >
                <IconXmark className="transition-none size-4 text-gray-normal group-hover/deleteButton:text-gray-dark" />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-col mt-auto gap-[0.5rem]">
          <Button
            onClick={() => {
              appendLocation({
                siDo: '',
                siGunGu: '',
                roadNameAddress: '',
                addressLat: 0,
                addressLong: 0,
                name: '',
              });
            }}
            buttonType="secondary"
            className="w-full px-[0.3125rem]"
          >
            장소 추가하기
          </Button>
          <Button
            onClick={handleVoteCreate}
            buttonType="primary"
            className="w-full px-[0.3125rem]"
            disabled={!isAllLocationsFilled}
          >
            {placeVoteRoomCheckData?.data.existence
              ? '투표 재생성하기'
              : '투표 생성하기'}
          </Button>
        </div>
      </div>
      <div className="rounded-default min-h-[31.25rem] lg:min-h-[calc(100vh-8rem)] order-1 lg:order-2">
        <KakaoMap coordinates={coordinates} />
      </div>
    </div>
  );
}
