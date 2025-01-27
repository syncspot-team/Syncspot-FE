import { useForm, useFieldArray } from 'react-hook-form';
import KakaoLocationPicker from '@src/components/common/kakao/KakaoLocationPicker';
import { ISelectedLocation } from '@src/components/common/kakao/types';
import KakaoMap from '@src/components/common/kakao/KakaoMap';
import { useMemo } from 'react';
import IconXmark from '@src/assets/icons/IconXmark.svg?react';
import Button from '@src/components/common/button/Button';

interface ILocationForm {
  locations: {
    siDo: string;
    siGunGu: string;
    roadNameAddress: string;
    addressLat: number;
    addressLong: number;
  }[];
}

const DUMMY_LOCATIONS = {
  locations: [
    {
      siDo: '서울특별시',
      siGunGu: '강남구',
      roadNameAddress:
        '테헤란로 427 테헤란로 427 테헤란로 427 테헤란로 427 테헤란로 427 테헤란로 427',
      addressLat: 37.5065,
      addressLong: 127.0536,
    },
    {
      siDo: '서울특별시',
      siGunGu: '서초구',
      roadNameAddress: '강남대로 373',
      addressLat: 37.4969,
      addressLong: 127.0278,
    },
    {
      siDo: '서울특별시',
      siGunGu: '마포구',
      roadNameAddress: '월드컵북로 396',
      addressLat: 37.5575,
      addressLong: 126.9076,
    },
  ],
};

export default function PlaceCreatePage() {
  const { control, setValue, watch } = useForm<ILocationForm>({
    defaultValues: DUMMY_LOCATIONS,
  });

  const locations = watch('locations');

  const { fields: locationFields, append: appendLocation } = useFieldArray({
    control,
    name: 'locations',
  });

  const isAllLocationsFilled = locations.every(
    (loc) => loc.addressLat !== 0 && loc.addressLong !== 0,
  );

  const handleLocationSelect = (location: ISelectedLocation, index: number) => {
    // 선택한 장소에 대해서 내 장소 목록에 있는 값들과 비교하여 이미 존재하는 장소인지를 확인하고, 이미 존재한다면
    // 토스트 메세지를 띄우고 false를 리턴한다.

    const { place, address } = location;
    // 새로운 값 설정
    setValue(
      `locations.${index}.siDo` as const,
      address?.address.region_1depth_name || '',
    );
    setValue(
      `locations.${index}.siGunGu` as const,
      address?.address.region_2depth_name || '',
    );
    setValue(
      `locations.${index}.roadNameAddress` as const,
      place.place_name || '',
    );
    setValue(
      `locations.${index}.addressLat` as const,
      address?.y ? parseFloat(address.y) : 0,
    );
    setValue(
      `locations.${index}.addressLong` as const,
      address?.x ? parseFloat(address.x) : 0,
    );

    // 장소 선택 완료 후 처리 (장소 수정, 저장 요청시에 사용될 장소에 대한 값)
    const currentLocation = {
      siDo: address?.address.region_1depth_name || '',
      siGunGu: address?.address.region_2depth_name || '',
      roadNameAddress: place.place_name || '',
      addressLat: address?.y ? parseFloat(address.y) : 0,
      addressLong: address?.x ? parseFloat(address.x) : 0,
    };

    // 서버로 장소 저장 및 수정 요청하는 부분
    console.log(currentLocation);

    // index가 초기 더미 데이터의 길이보다 작으면 기존 필드 (초기 더미데이터의 길이로 판별하고 있지만 실제로는 useState로 관리되는 나의 주소목록들을 기준으로 판단해야한다.)
    // 또는 백엔드에서 기존에 장소 목록들을 줄때, placeId값도 준다고 하니, 이 값을 활용해서, 주소들이 있는 목록으로 부터 placeId값을 받아와서 해당 값이 존재하는 경우에는 장소 수정요청을,
    // 그렇지 않은 경우에는 저장요청을 보낸다.
    // const isExistingField = index < DUMMY_LOCATIONS.locations.length;

    // if (isExistingField) {
    //   alert('장소 수정 요청을 보냅니다.');
    //   // TODO: 수정 API 호출
    // } else {
    //   alert('새로운 장소 저장 요청을 보냅니다.');
    //   // TODO: 저장 API 호출
    // }

    return true;
  };

  const handleAddLocation = () => {
    appendLocation({
      siDo: '',
      siGunGu: '',
      roadNameAddress: '',
      addressLat: 0,
      addressLong: 0,
    });
  };

  const isValidLocation = (loc: (typeof locations)[0]) =>
    loc.addressLat !== 0 && loc.addressLong !== 0;

  const coordinates = useMemo(() => {
    return locations.filter(isValidLocation).map((location) => ({
      lat: location.addressLat,
      lng: location.addressLong,
      roadNameAddress: location.roadNameAddress,
      isMyLocation: false,
    }));
  }, [JSON.stringify(locations.filter(isValidLocation))]);

  const handleVoteCreate = () => {
    // TODO: 투표 생성 요청
  };

  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-2 px-4 lg:px-[7.5rem] gap-[0.9375rem] mt-[1.875rem]">
      <div className="flex flex-col justify-center order-2 p-5 rounded-default bg-gray-light lg:order-1">
        <h1 className="flex items-center justify-center text-title text-tertiary my-[1.25rem]">
          모임 장소 투표 생성 하기
        </h1>
        <div className="flex flex-col items-center text-content text-gray-dark mb-[1.25rem]">
          <span>우리 같이 투표해요!</span>
          <span>원하는 모임 장소를 선택한 후 투표를 진행하세요!</span>
        </div>
        <ul className="flex flex-col max-h-[31.25rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full p-1">
          {locationFields.map((field, index) => (
            <li
              key={field.id}
              className="flex items-center justify-between bg-white-default rounded-default mb-[0.625rem] hover:opacity-55 hover:ring-1 hover:ring-gray-dark"
            >
              <KakaoLocationPicker
                className="flex-1 w-full text-content bg-white-default py-[1.3125rem] truncate"
                onSelect={(location) => handleLocationSelect(location, index)}
                defaultAddress={field.roadNameAddress}
              />
              <button
                type="button"
                onClick={() => {
                  alert('해당 장소를 삭제하시겠습니까?');
                }}
                className="p-1 mx-2 rounded-[0.5rem] hover:bg-gray-dark"
              >
                <IconXmark className="size-5" />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex flex-col mt-[1.75rem] gap-[0.5rem]">
          <Button
            onClick={handleAddLocation}
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
            투표 생성하기
          </Button>
        </div>
      </div>
      <div className="rounded-default min-h-[31.25rem] order-1 lg:order-2">
        <KakaoMap coordinates={coordinates} />
      </div>
    </div>
  );
}
