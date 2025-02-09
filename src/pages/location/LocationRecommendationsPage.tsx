import KakaoMap from '@src/components/common/kakao/KakaoMap';
import { useState, useMemo, useEffect } from 'react';
import IconLinkPin from '@src/assets/icons/IconLinkPin.svg?react';
import IconStudy from '@src/assets/icons/IconStudy.svg?react';
import IconCafe from '@src/assets/icons/IconCafe.svg?react';
import IconRestaurant from '@src/assets/icons/IconRestaurant.svg?react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { useGetRecommendPlaceSearchQuery } from '@src/state/queries/location/useGetRecommendPlaceSearchQuery';
import { useMidpointSearchQuery } from '@src/state/queries/location/useMidpointSearchQuery';
import { IPlaceContent } from '@src/types/location/recommendPlaceSearchResponseType';
import AddressDisplay from '@src/components/location/AddressDisplay';
import { IMidpointDataResponseType } from '@src/types/location/midpointSearchResponseType';
import { PATH } from '@src/constants/path';

const PLACE_STANDARDS = {
  ALL: 'ALL',
  STUDY: 'STUDY',
  CAFE: 'CAFE',
  RESTAURANT: 'RESTAURANT',
} as const;

type PLACE_STANDARDS_TYPE =
  (typeof PLACE_STANDARDS)[keyof typeof PLACE_STANDARDS];

export default function LocationRecommendationsPage() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const urlLat = Number(searchParams.get('lat'));
  const urlLng = Number(searchParams.get('lng'));
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPlaceStandard, setSelectedPlaceStandard] =
    useState<PLACE_STANDARDS_TYPE>(PLACE_STANDARDS.ALL);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  const { data: recommendPlaceSearchData, refetch } =
    useGetRecommendPlaceSearchQuery(selectedPlaceStandard, currentPage);

  const { data: midpointSearchData } = useMidpointSearchQuery();

  const coordinates = useMemo(() => {
    const recommendCoords =
      recommendPlaceSearchData?.data.content.map((place: IPlaceContent) => ({
        lat: place.addressLat,
        lng: place.addressLong,
        isMyLocation: false,
        roadNameAddress: place.name,
        name: place.name,
        isSelected: place.name === selectedPlace,
      })) || [];

    const firstMidpoint = midpointSearchData?.data[0];
    const midpointCoord = firstMidpoint
      ? [
          {
            lat: firstMidpoint.addressLat,
            lng: firstMidpoint.addressLong,
            isMyLocation: true,
            roadNameAddress: firstMidpoint.name,
            name: '중간 지점',
          },
        ]
      : [];

    return [...recommendCoords, ...midpointCoord];
  }, [recommendPlaceSearchData, midpointSearchData, selectedPlace]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  const handlePlaceStandardChange = (standard: PLACE_STANDARDS_TYPE) => {
    setSelectedPlaceStandard(standard);
    setCurrentPage(0);
  };

  useEffect(() => {
    refetch();
  }, [selectedPlaceStandard, currentPage, refetch]);

  useEffect(() => {
    if (recommendPlaceSearchData?.data.content.length > 0) {
      setSelectedPlace(recommendPlaceSearchData.data.content[0].name);
    }
  }, [
    recommendPlaceSearchData?.data.content,
    currentPage,
    selectedPlaceStandard,
  ]);

  useEffect(() => {
    if (midpointSearchData?.data) {
      const isValidLocation = midpointSearchData.data.some(
        (point: IMidpointDataResponseType) =>
          point.addressLat === urlLat && point.addressLong === urlLng,
      );

      if (!isValidLocation) {
        navigate(PATH.LOCATION_RESULT(roomId!));
      }
    }
  }, [midpointSearchData, urlLat, urlLng, navigate, roomId]);

  const totalPages = recommendPlaceSearchData?.data.totalPages || 5;
  const currentGroup = Math.floor(currentPage / 5);
  const startPage = currentGroup * 5;
  const endPage = Math.min(startPage + 5, totalPages);

  return (
    <>
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 px-4 lg:px-[7.5rem] gap-[0.9375rem] mt-[1.625rem]">
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
              onClick={() => handlePlaceStandardChange(PLACE_STANDARDS.ALL)}
            >
              전체
            </li>
            <li
              className={`flex items-center gap-[0.375rem] ${
                selectedPlaceStandard === PLACE_STANDARDS.STUDY
                  ? 'bg-primary text-white-default'
                  : 'text-blue-dark02'
              } hover:scale-105`}
              onClick={() => handlePlaceStandardChange(PLACE_STANDARDS.STUDY)}
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
              onClick={() => handlePlaceStandardChange(PLACE_STANDARDS.CAFE)}
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
                handlePlaceStandardChange(PLACE_STANDARDS.RESTAURANT)
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
            {recommendPlaceSearchData?.data.content.map(
              (place: IPlaceContent, index: number) => (
                <li
                  key={index}
                  className={`flex flex-col justify-center p-4 pb-[0.625rem] cursor-pointer rounded-[0.625rem] shadow-sm ${
                    selectedPlace === place.name
                      ? 'ring-2 ring-blue-normal01'
                      : ''
                  }`}
                  onClick={() => setSelectedPlace(place.name)}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex-shrink-0">
                      {(selectedPlaceStandard === 'ALL' ||
                        selectedPlaceStandard === place.placeStandard) && (
                        <>
                          {place.placeStandard === 'STUDY' && (
                            <IconStudy className="size-5" />
                          )}
                          {place.placeStandard === 'CAFE' && (
                            <IconCafe className="size-5" />
                          )}
                          {place.placeStandard === 'RESTAURANT' && (
                            <IconRestaurant className="size-5" />
                          )}
                        </>
                      )}
                    </span>
                    <span className="text-content text-blue-dark02">
                      {place.roadNameAddress}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 my-2">
                    <span className="text-[1.25rem] text-blue-dark01">
                      {place.name}
                    </span>
                    <IconLinkPin className="flex-shrink-0 size-4" />
                  </div>
                  <div className="mt-1">
                    <AddressDisplay address={place.siGunGu} />
                  </div>
                </li>
              ),
            )}
          </ul>
          <div className="h-[0.7fr] flex items-center justify-center gap-4 mt-4">
            {currentGroup > 0 && (
              <button
                className="px-2 rounded hover:bg-gray-light"
                onClick={() => handlePageChange(startPage - 1)}
              >
                이전
              </button>
            )}
            {Array.from(
              { length: endPage - startPage },
              (_, i) => startPage + i,
            ).map((page) => (
              <button
                key={page}
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentPage === page
                    ? 'bg-blue-100 text-blue-dark01'
                    : 'hover:bg-gray-light'
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page + 1}
              </button>
            ))}
            {endPage < totalPages && (
              <button
                className="px-2 rounded hover:bg-gray-light"
                onClick={() => handlePageChange(endPage)}
              >
                다음
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
