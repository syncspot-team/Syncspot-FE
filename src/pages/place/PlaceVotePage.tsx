import { useForm } from 'react-hook-form';
import KakaoMap from '@src/components/common/kakao/KakaoMap';
import { useMemo, useState } from 'react';
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
    {
      siDo: '서울특별시',
      siGunGu: '마포구',
      roadNameAddress: '월드컵북로 396',
      addressLat: 37.5575,
      addressLong: 126.9076,
    },
  ],
};

export default function PlaceVotePage() {
  const { watch } = useForm<ILocationForm>({
    defaultValues: DUMMY_LOCATIONS,
  });

  const [selectedLocationIndex, setSelectedLocationIndex] = useState<
    number | null
  >(null);

  const locations = watch('locations');

  const isValidLocation = (loc: (typeof locations)[0]) =>
    loc.addressLat !== 0 && loc.addressLong !== 0;

  const coordinates = useMemo(() => {
    return locations.filter(isValidLocation).map((location, index) => ({
      lat: location.addressLat,
      lng: location.addressLong,
      roadNameAddress: location.roadNameAddress,
      isMyLocation: index === selectedLocationIndex,
    }));
  }, [locations, selectedLocationIndex]);

  const handleVoteSubmit = () => {
    // TODO: 투표 제출 요청
  };

  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-2 px-4 lg:px-[7.5rem] gap-[0.9375rem] mt-[1.875rem]">
      <div className="flex flex-col justify-center order-2 p-5 rounded-default bg-gray-light lg:order-1">
        <h1 className="flex items-center justify-center text-title text-tertiary my-[1.25rem]">
          모임 장소 투표하기
        </h1>
        <div className="flex flex-col items-center text-content text-gray-dark mb-[1.25rem]">
          <span>우리 같이 투표해요!</span>
          <span>원하는 모임 장소를 선택한 후 투표를 진행하세요!</span>
        </div>
        <ul className="flex flex-col max-h-[31.25rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full p-1">
          {locations.map((location, index) => (
            <li
              key={index}
              className={`flex items-center bg-white-default rounded-default mb-[0.625rem] hover:opacity-55 cursor-pointer transition-all ${
                selectedLocationIndex === index
                  ? 'ring-2 ring-primary'
                  : 'hover:ring-1 hover:ring-gray-dark'
              }`}
              onClick={() => setSelectedLocationIndex(index)}
            >
              <span className="flex-1 w-full text-content bg-white-default py-[1.3125rem] pl-[0.9375rem] truncate rounded-default">
                {location.roadNameAddress}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-[1.75rem]">
          <Button
            buttonType="primary"
            disabled={selectedLocationIndex === null}
            className="px-[0.3125rem] w-full"
            onClick={handleVoteSubmit}
          >
            투표하기
          </Button>
        </div>
      </div>
      <div className="rounded-default min-h-[31.25rem] order-1 lg:order-2">
        <KakaoMap coordinates={coordinates} />
      </div>
    </div>
  );
}
