import KakaoMap from '@src/components/common/kakao/KakaoMap';
import { useState, useMemo, useEffect } from 'react';
import IconLinkPin from '@src/assets/icons/IconLinkPin.svg?react';
import IconStudy from '@src/assets/icons/IconStudy.svg?react';
import IconCafe from '@src/assets/icons/IconCafe.svg?react';
import IconRestaurant from '@src/assets/icons/IconRestaurant.svg?react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { PATH } from '@src/constants/path';

const RECOMMEND_LOCATIONS = [
  // Page 1
  {
    placeId: 1,
    siDo: '서울특별시',
    siGunGu: '송파구',
    roadNameAddress: '오금로 123',
    addressLat: 37.5123,
    addressLong: 127.1076,
    placeStandard: 'cafe',
    page: 1,
  },
  {
    placeId: 2,
    siDo: '서울특별시',
    siGunGu: '구로구',
    roadNameAddress: '디지털로 300',
    addressLat: 37.484,
    addressLong: 126.9011,
    placeStandard: 'library',
    page: 1,
  },
  {
    placeId: 3,
    siDo: '서울특별시',
    siGunGu: '중구',
    roadNameAddress: '을지로 50',
    addressLat: 37.5657,
    addressLong: 126.9839,
    placeStandard: 'restaurant',
    page: 1,
  },
  {
    placeId: 4,
    siDo: '서울특별시',
    siGunGu: '강북구',
    roadNameAddress: '한천로 660',
    addressLat: 37.6397,
    addressLong: 127.0266,
    placeStandard: 'cafe',
    page: 1,
  },
  {
    placeId: 5,
    siDo: '서울특별시',
    siGunGu: '광진구',
    roadNameAddress: '능동로 209',
    addressLat: 37.5472,
    addressLong: 127.0744,
    placeStandard: 'library',
    page: 1,
  },
  // Page 2
  {
    placeId: 6,
    siDo: '서울특별시',
    siGunGu: '마포구',
    roadNameAddress: '가상의 도로 234번지',
    addressLat: 37.5473,
    addressLong: 126.9534,
    placeStandard: 'restaurant',
    page: 2,
  },
  {
    placeId: 7,
    siDo: '서울특별시',
    siGunGu: '서초구',
    roadNameAddress: '가상의 도로 561번지',
    addressLat: 37.4829,
    addressLong: 127.0293,
    placeStandard: 'cafe',
    page: 2,
  },
  {
    placeId: 8,
    siDo: '서울특별시',
    siGunGu: '강남구',
    roadNameAddress: '가상의 도로 789번지',
    addressLat: 37.4965,
    addressLong: 127.0364,
    placeStandard: 'library',
    page: 2,
  },
  {
    placeId: 9,
    siDo: '서울특별시',
    siGunGu: '송파구',
    roadNameAddress: '가상의 도로 678번지',
    addressLat: 37.5014,
    addressLong: 127.1123,
    placeStandard: 'restaurant',
    page: 2,
  },
  {
    placeId: 10,
    siDo: '서울특별시',
    siGunGu: '은평구',
    roadNameAddress: '가상의 도로 342번지',
    addressLat: 37.6188,
    addressLong: 126.9225,
    placeStandard: 'cafe',
    page: 2,
  },
  // Page 3
  {
    placeId: 11,
    siDo: '서울특별시',
    siGunGu: '양천구',
    roadNameAddress: '가상의 도로 123번지',
    addressLat: 37.5167,
    addressLong: 126.8669,
    placeStandard: 'library',
    page: 3,
  },
  {
    placeId: 12,
    siDo: '서울특별시',
    siGunGu: '동대문구',
    roadNameAddress: '가상의 도로 789번지',
    addressLat: 37.5743,
    addressLong: 127.0396,
    placeStandard: 'restaurant',
    page: 3,
  },
  {
    placeId: 13,
    siDo: '서울특별시',
    siGunGu: '중랑구',
    roadNameAddress: '가상의 도로 456번지',
    addressLat: 37.6063,
    addressLong: 127.0925,
    placeStandard: 'cafe',
    page: 3,
  },
  {
    placeId: 14,
    siDo: '서울특별시',
    siGunGu: '성북구',
    roadNameAddress: '가상의 도로 333번지',
    addressLat: 37.5912,
    addressLong: 127.0164,
    placeStandard: 'library',
    page: 3,
  },
  {
    placeId: 15,
    siDo: '서울특별시',
    siGunGu: '용산구',
    roadNameAddress: '가상의 도로 555번지',
    addressLat: 37.5311,
    addressLong: 126.9802,
    placeStandard: 'restaurant',
    page: 3,
  },
  // Page 4
  {
    placeId: 16,
    siDo: '서울특별시',
    siGunGu: '관악구',
    roadNameAddress: '가상의 도로 111번지',
    addressLat: 37.4786,
    addressLong: 126.9519,
    placeStandard: 'cafe',
    page: 4,
  },
  {
    placeId: 17,
    siDo: '서울특별시',
    siGunGu: '강서구',
    roadNameAddress: '가상의 도로 222번지',
    addressLat: 37.5588,
    addressLong: 126.8364,
    placeStandard: 'library',
    page: 4,
  },
  {
    placeId: 18,
    siDo: '서울특별시',
    siGunGu: '도봉구',
    roadNameAddress: '가상의 도로 333번지',
    addressLat: 37.6688,
    addressLong: 127.0473,
    placeStandard: 'restaurant',
    page: 4,
  },
  {
    placeId: 19,
    siDo: '서울특별시',
    siGunGu: '노원구',
    roadNameAddress: '가상의 도로 444번지',
    addressLat: 37.6543,
    addressLong: 127.0602,
    placeStandard: 'cafe',
    page: 4,
  },
  {
    placeId: 20,
    siDo: '서울특별시',
    siGunGu: '구로구',
    roadNameAddress: '가상의 도로 555번지',
    addressLat: 37.4867,
    addressLong: 126.8994,
    placeStandard: 'library',
    page: 4,
  },
  // Page 5
  {
    placeId: 21,
    siDo: '서울특별시',
    siGunGu: '중구',
    roadNameAddress: '가상의 도로 666번지',
    addressLat: 37.5652,
    addressLong: 126.9901,
    placeStandard: 'restaurant',
    page: 5,
  },
  {
    placeId: 22,
    siDo: '서울특별시',
    siGunGu: '강북구',
    roadNameAddress: '가상의 도로 777번지',
    addressLat: 37.6389,
    addressLong: 127.0247,
    placeStandard: 'cafe',
    page: 5,
  },
  {
    placeId: 23,
    siDo: '서울특별시',
    siGunGu: '광진구',
    roadNameAddress: '가상의 도로 888번지',
    addressLat: 37.5475,
    addressLong: 127.0755,
    placeStandard: 'library',
    page: 5,
  },
  {
    placeId: 24,
    siDo: '서울특별시',
    siGunGu: '마포구',
    roadNameAddress: '가상의 도로 999번지',
    addressLat: 37.5512,
    addressLong: 126.9524,
    placeStandard: 'restaurant',
    page: 5,
  },
  {
    placeId: 25,
    siDo: '서울특별시',
    siGunGu: '서초구',
    roadNameAddress: '가상의 도로 101번지',
    addressLat: 37.4902,
    addressLong: 127.0298,
    placeStandard: 'cafe',
    page: 5,
  },
];

const MIDPOINT_LOCATIONS = [
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

const PLACE_STANDARDS = {
  ALL: 'ALL',
  STUDY: 'STUDY',
  CAFE: 'CAFE',
  RESTAURANT: 'RESTAURANT',
};

type PLACE_STANDARDS_TYPE =
  (typeof PLACE_STANDARDS)[keyof typeof PLACE_STANDARDS];

export default function LocationRecommendationsPage() {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlaceStandard, setSelectedPlaceStandard] =
    useState<PLACE_STANDARDS_TYPE>(PLACE_STANDARDS.ALL);
  const navigate = useNavigate();

  // 초기 선택된 위치를 URL 파라미터 기반으로 찾기
  const selectedMidpoint = useMemo(() => {
    const location = searchParams.get('location');
    const lat = Number(searchParams.get('lat'));
    const lng = Number(searchParams.get('lng'));

    return MIDPOINT_LOCATIONS.find(
      (loc) =>
        loc.roadNameAddress === location &&
        loc.addressLat === lat &&
        loc.addressLong === lng,
    );
  }, [searchParams]);

  useEffect(() => {
    const lat = Number(searchParams.get('lat'));
    const lng = Number(searchParams.get('lng'));
    const location = searchParams.get('location');

    const isValidLocation = MIDPOINT_LOCATIONS.some(
      (loc) =>
        loc.roadNameAddress === location &&
        loc.addressLat === lat &&
        loc.addressLong === lng,
    );

    if (!lat || !lng || !location || !isValidLocation) {
      navigate(PATH.LOCATION_RESULT(roomId));
    }
  }, [searchParams, navigate, roomId]);

  // 현재 페이지에 해당하는 장소들만 필터링
  const currentPageLocations = useMemo(() => {
    return RECOMMEND_LOCATIONS.filter(
      (location) => location.page === currentPage,
    );
  }, [currentPage]);

  const coordinates = useMemo(() => {
    const recommendCoords = currentPageLocations.map((location) => ({
      lat: location.addressLat,
      lng: location.addressLong,
      isMyLocation: false,
      roadNameAddress: location.roadNameAddress,
    }));

    // 초기 선택된 위치를 항상 빨간 마커로 표시
    const midpointCoord = selectedMidpoint
      ? [
          {
            lat: selectedMidpoint.addressLat,
            lng: selectedMidpoint.addressLong,
            isMyLocation: true,
            roadNameAddress: selectedMidpoint.roadNameAddress,
          },
        ]
      : [];

    return [...recommendCoords, ...midpointCoord];
  }, [currentPageLocations, selectedMidpoint]);

  return (
    <>
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 px-4 lg:px-[7.5rem] gap-[0.9375rem] mt-[2.1875rem]">
        <div className="hidden lg:block">
          <h3 className="flex items-center text-menu-selected text-blue-dark01">
            {searchParams.get('location')}
          </h3>
        </div>
        <div>
          <ul className="flex items-center gap-3 *:shadow-md *:px-3 *:py-1 *:rounded-[1.25rem] *:cursor-pointer [&_*]:transition-none">
            <li
              className={`${
                selectedPlaceStandard === PLACE_STANDARDS.ALL
                  ? 'bg-primary text-white-default'
                  : 'text-blue-dark02'
              } hover:scale-105`}
              onClick={() => setSelectedPlaceStandard(PLACE_STANDARDS.ALL)}
            >
              전체
            </li>
            <li
              className={`flex items-center gap-[0.375rem] ${
                selectedPlaceStandard === PLACE_STANDARDS.STUDY
                  ? 'bg-primary text-white-default'
                  : 'text-blue-dark02'
              } hover:scale-105`}
              onClick={() => setSelectedPlaceStandard(PLACE_STANDARDS.STUDY)}
            >
              <IconStudy className="size-4" />
              <h3 className="text-content">스터디</h3>
            </li>
            <li
              className={`flex items-center gap-[0.375rem] ${
                selectedPlaceStandard === PLACE_STANDARDS.CAFE
                  ? 'bg-primary text-white-default'
                  : 'text-blue-dark02'
              } hover:scale-105`}
              onClick={() => setSelectedPlaceStandard(PLACE_STANDARDS.CAFE)}
            >
              <IconCafe className="size-4" />
              <h3 className="text-content">카페</h3>
            </li>
            <li
              className={`flex items-center gap-[0.375rem] ${
                selectedPlaceStandard === PLACE_STANDARDS.RESTAURANT
                  ? 'bg-primary text-white-default'
                  : 'text-blue-dark02'
              } hover:scale-105`}
              onClick={() =>
                setSelectedPlaceStandard(PLACE_STANDARDS.RESTAURANT)
              }
            >
              <IconRestaurant className="size-4" />
              <h3 className="text-content">식당</h3>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 px-4 lg:px-[7.5rem] gap-[0.9375rem] mt-[0.4375rem]">
        <div className="rounded-default min-h-[40.625rem]">
          <KakaoMap coordinates={coordinates} />
        </div>
        <div className="flex flex-col h-full">
          <ul className="flex-1 grid grid-cols-1 gap-[0.625rem]">
            {currentPageLocations.map((location) => (
              <li
                key={location.placeId}
                className="flex flex-col justify-center p-4 cursor-pointer rounded-[0.625rem] bg-gray-light shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="flex-shrink-0">
                    {location.placeStandard === 'library' && (
                      <IconStudy className="size-5" />
                    )}
                    {location.placeStandard === 'cafe' && (
                      <IconCafe className="size-5" />
                    )}
                    {location.placeStandard === 'restaurant' && (
                      <IconRestaurant className="size-5" />
                    )}
                  </span>
                  <span className="text-content text-blue-dark02">
                    {location.roadNameAddress}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[1.25rem] text-blue-dark01">
                    {location.roadNameAddress}
                  </span>
                  <IconLinkPin className="flex-shrink-0 size-4" />
                </div>
                <div className="mt-1">
                  <h3 className="truncate text-description text-gray-dark">
                    {location.siGunGu}
                  </h3>
                </div>
              </li>
            ))}
          </ul>
          <div className="h-[0.7fr] flex items-center justify-center gap-4 mt-4">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentPage === page
                    ? 'bg-blue-100 text-blue-dark01'
                    : 'hover:bg-gray-light'
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
