import { useForm, useFieldArray } from 'react-hook-form';
import KakaoLocationPicker from '@src/components/common/kakao/KakaoLocationPicker';
import { ISelectedLocation } from '@src/components/common/kakao/types';
import KakaoMap from '@src/components/common/kakao/KakaoMap';
import { useMemo } from 'react';
import Button from '@src/components/common/button/Button';

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

const DUMMY_LOCATIONS = {
  myLocations: [
    {
      siDo: '서울특별시',
      siGunGu: '강남구',
      roadNameAddress: '테헤란로 427',
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
  ],
  friendLocations: [
    {
      siDo: '서울특별시',
      siGunGu: '마포구',
      roadNameAddress: '월드컵북로 396',
      addressLat: 37.5826,
      addressLong: 126.9012,
    },
    {
      siDo: '서울특별시',
      siGunGu: '용산구',
      roadNameAddress: '이태원로 217',
      addressLat: 37.5384,
      addressLong: 126.9946,
    },
  ],
};

export default function LocationEnterPage() {
  const { control, setValue, watch } = useForm<ILocationForm>({
    defaultValues: DUMMY_LOCATIONS,
  });

  const myLocations = watch('myLocations');
  const friendLocations = watch('friendLocations');

  const { fields: myLocationFields, append: appendMyLocation } = useFieldArray({
    control,
    name: 'myLocations',
  });

  const { fields: friendLocationFields } = useFieldArray({
    control,
    name: 'friendLocations',
  });

  const handleLocationSelect = (
    location: ISelectedLocation,
    index: number,
    isMyLocation: boolean,
  ) => {
    const { place, address } = location;
    const prefix = isMyLocation ? 'myLocations' : 'friendLocations';

    setValue(
      `${prefix}.${index}.siDo` as const,
      address?.address.region_1depth_name || '',
    );
    setValue(
      `${prefix}.${index}.siGunGu` as const,
      address?.address.region_2depth_name || '',
    );
    setValue(
      `${prefix}.${index}.roadNameAddress` as const,
      place.place_name || '',
    );
    setValue(
      `${prefix}.${index}.addressLat` as const,
      address?.y ? parseFloat(address.y) : 0,
    );
    setValue(
      `${prefix}.${index}.addressLong` as const,
      address?.x ? parseFloat(address.x) : 0,
    );

    return true;
  };

  const isValidLocation = (loc: (typeof myLocations)[0]) =>
    loc.addressLat !== 0 &&
    loc.addressLong !== 0 &&
    loc.siDo !== '' &&
    loc.siGunGu !== '' &&
    loc.roadNameAddress !== '';

  const isAllMyLocationsValid =
    myLocations.length > 0 && myLocations.every(isValidLocation);

  const coordinates = useMemo(() => {
    const formatLocations = (
      locations: typeof myLocations,
      isMyLocation: boolean,
    ) =>
      locations.filter(isValidLocation).map((location) => ({
        lat: location.addressLat,
        lng: location.addressLong,
        isMyLocation,
        roadNameAddress: location.roadNameAddress,
      }));

    return [
      ...formatLocations(myLocations, true),
      ...formatLocations(friendLocations, false),
    ];
  }, [
    JSON.stringify(myLocations.filter(isValidLocation)),
    JSON.stringify(friendLocations.filter(isValidLocation)),
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
    <div className="grid w-full grid-cols-1 lg:grid-cols-2 px-[3.125rem] lg:px-[7.5rem] gap-[0.9375rem] mt-[1.875rem]">
      <div className="flex flex-col justify-center order-2 p-5 rounded-default bg-gray-light lg:order-1">
        <h1 className="flex items-center justify-center text-title text-tertiary my-[2.5rem]">
          모임 정보 입력
        </h1>
        <span className="text-subtitle text-tertiary mb-[0.75rem]">
          내가 입력한 장소
        </span>
        {myLocationFields.map((field, index) => (
          <KakaoLocationPicker
            key={field.id}
            className="w-full text-left bg-white-default whitespace-nowrap mb-[0.625rem] hover:opacity-55 hover:ring-1 hover:ring-gray-dark"
            onSelect={(location) => handleLocationSelect(location, index, true)}
            defaultAddress={field.roadNameAddress}
          />
        ))}
        <span className="text-subtitle text-tertiary my-[0.75rem]">
          친구가 입력한 장소
        </span>
        {friendLocationFields.map((field) => (
          <div
            key={field.id}
            className="w-full text-left bg-white-default rounded-default whitespace-nowrap mb-[0.625rem] py-[1.3125rem] px-[1.5rem] cursor-not-allowed opacity-70"
          >
            {field.roadNameAddress || '위치 정보 없음'}
          </div>
        ))}

        <div className="flex flex-col mt-[1.75rem] gap-[0.5rem]">
          <Button
            buttonType="add"
            onClick={handleAddLocation}
            className="w-full"
          >
            장소 추가하기
          </Button>
          <Button
            buttonType="primary"
            fontSize="small"
            isLoading={false}
            disabled={!isAllMyLocationsValid}
            className="w-full"
          >
            중간 지점 찾기
          </Button>
        </div>
      </div>
      <div className="rounded-default min-h-[500px] shadow-md order-1 lg:order-2">
        <KakaoMap coordinates={coordinates} />
      </div>
    </div>
  );
}
