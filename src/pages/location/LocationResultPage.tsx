import KakaoMap from '@src/components/common/kakao/KakaoMap';
import { useState, useMemo } from 'react';
import IconRightHalfArrow from '@src/assets/icons/IconRightHalfArrow.svg?react';
import IconLinkPin from '@src/assets/icons/IconLinkPin.svg?react';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '@src/constants/path';

const ENTER_LOCATIONS = [
  {
    placeId: 1,
    siDo: '서울특별시',
    siGunGu: '강남구',
    roadNameAddress: '테헤란로 427',
    addressLat: 37.5065,
    addressLong: 127.0536,
  },
  {
    placeId: 2,
    siDo: '서울특별시',
    siGunGu: '서초구',
    roadNameAddress: '강남대로 373',
    addressLat: 37.4969,
    addressLong: 127.0278,
  },
  {
    placeId: 3,
    siDo: '서울특별시',
    siGunGu: '마포구',
    roadNameAddress: '월드컵북로 396',
    addressLat: 37.5826,
    addressLong: 126.9012,
  },
  {
    placeId: 4,
    siDo: '서울특별시',
    siGunGu: '용산구',
    roadNameAddress: '이태원로 217',
    addressLat: 37.5384,
    addressLong: 126.9946,
  },
  {
    placeId: 5,
    siDo: '서울특별시',
    siGunGu: '송파구',
    roadNameAddress: '올림픽로 300',
    addressLat: 37.5154,
    addressLong: 127.1039,
  },
];

const RESULT_LOCATIONS = [
  {
    placeId: 1,
    siDo: '서울특별시',
    siGunGu: '노원구',
    roadNameAddress: '동일로 1238',
    addressLat: 37.6544,
    addressLong: 127.0565,
  },
  {
    placeId: 2,
    siDo: '서울특별시',
    siGunGu: '구로구',
    roadNameAddress: '디지털로 300',
    addressLat: 37.484,
    addressLong: 126.9011,
  },
  {
    placeId: 3,
    siDo: '서울특별시',
    siGunGu: '중구',
    roadNameAddress: '을지로 50',
    addressLat: 37.5657,
    addressLong: 126.9839,
  },
  {
    placeId: 4,
    siDo: '서울특별시',
    siGunGu: '강북구',
    roadNameAddress: '한천로 660',
    addressLat: 37.6397,
    addressLong: 127.0266,
  },
  {
    placeId: 5,
    siDo: '서울특별시',
    siGunGu: '광진구',
    roadNameAddress: '능동로 209',
    addressLat: 37.5472,
    addressLong: 127.0744,
  },
];

interface ILocation {
  placeId: number;
  siDo: string;
  siGunGu: string;
  roadNameAddress: string;
  addressLat: number;
  addressLong: number;
}

export default function LocationResultPage() {
  const SEQUENCE = ['첫', '두', '세', '네', '다섯'];
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [selectedLocation, setSelectedLocation] = useState<number>(
    RESULT_LOCATIONS[0].placeId,
  );

  const coordinates = useMemo(() => {
    const enterCoords = ENTER_LOCATIONS.map((location) => ({
      lat: location.addressLat,
      lng: location.addressLong,
      isMyLocation: false,
      roadNameAddress: location.roadNameAddress,
    }));

    const selectedCoord = RESULT_LOCATIONS.filter(
      (location) => location.placeId === selectedLocation,
    ).map((location) => ({
      lat: location.addressLat,
      lng: location.addressLong,
      isMyLocation: true,
      roadNameAddress: location.roadNameAddress,
    }));

    return [...enterCoords, ...selectedCoord];
  }, [selectedLocation]);

  const handleClickMidpoint = (location: ILocation) => {
    const { addressLat, addressLong, roadNameAddress } = location;

    navigate(
      PATH.LOCATION_RECOMMENDATIONS(roomId) +
        `?lat=${addressLat}&lng=${addressLong}&location=${roadNameAddress}`,
    );
  };

  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-10 px-4 lg:px-[7.5rem] gap-[0.9375rem] mt-[2.5rem]">
      <div className="rounded-default min-h-[40.625rem] lg:col-span-6">
        <KakaoMap coordinates={coordinates} />
      </div>
      <div className="lg:col-span-4">
        <ul className="grid grid-cols-1 grid-rows-5 h-full gap-[0.625rem]">
          {RESULT_LOCATIONS.map((location, index) => (
            <li
              key={location.placeId}
              className={`flex flex-col justify-center h-full max-h-[8.125rem] p-4 cursor-pointer rounded-default shadow-sm ${
                selectedLocation === location.placeId
                  ? 'bg-blue-100 opacity-95 ring-2 ring-blue-normal01'
                  : 'bg-gray-light'
              }`}
              onClick={() => setSelectedLocation(location.placeId)}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="flex items-center justify-center -mt-[0.0625rem] rounded-full text-white-default bg-blue-dark01 size-6">
                    {index + 1}
                  </span>
                  <span className="text-blue-dark02 text-content">
                    우리의 {SEQUENCE[index]} 번째 중간 지점
                  </span>
                </span>
                <IconRightHalfArrow
                  onClick={() => {
                    handleClickMidpoint(location);
                  }}
                  className={`${
                    selectedLocation === location.placeId
                      ? 'opacity-100'
                      : 'opacity-0'
                  } rounded-[0.4375rem] p-1 mr-2 text-primary hover:bg-gray-light hover:scale-110`}
                />
              </div>
              <div className="flex items-center gap-4 my-[0.375rem]">
                <span className="truncate text-blue-dark01 text-subtitle">
                  {location.roadNameAddress}
                </span>
                <IconLinkPin className="flex-shrink-0 size-[1.125rem]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="truncate text-gray-dark">
                  {location.siGunGu}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
