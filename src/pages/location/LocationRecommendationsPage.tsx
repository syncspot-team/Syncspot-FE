import KakaoMap from '@src/components/common/kakao/KakaoMap';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { useGetRecommendPlaceSearchQuery } from '@src/state/queries/location/useGetRecommendPlaceSearchQuery';
import { useMidpointSearchQuery } from '@src/state/queries/location/useMidpointSearchQuery';
import { IMidpointDataResponseType } from '@src/types/location/midpointSearchResponseType';
import { PATH } from '@src/constants/path';
import PlaceTypeFilter, {
  PLACE_STANDARDS,
  PLACE_STANDARDS_TYPE,
} from '@src/components/location/PlaceTypeFilter';
import PlaceList from '@src/components/location/PlaceList';
import { useCoordinates } from '@src/hooks/location/useCoordinates';
import { useGetPlaceSearchQuery } from '@src/state/queries/location/useGetPlaceSearchQuery';
import LocationEnterErrorPage from '@src/components/location/LocationEnterErrorPage';
import BottomSheet from '@src/components/common/bottomSheet/BottomSheet';
import IconLeftArrow from '@src/assets/icons/IconLeftArrow.svg?react';
import IconRightArrow from '@src/assets/icons/IconRightArrow.svg?react';
import { IPlaceContent } from '@src/types/location/recommendPlaceSearchResponseType';

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

  const { data: placeSearchData, isLoading: isPlaceSearchLoading } =
    useGetPlaceSearchQuery();

  const { data: midpointSearchData } = useMidpointSearchQuery({
    enabled:
      placeSearchData?.data?.myLocationExistence ||
      placeSearchData?.data?.friendLocationExistence,
  });
  const { data: recommendPlaceSearchData, refetch } =
    useGetRecommendPlaceSearchQuery(selectedPlaceStandard, currentPage, {
      enabled:
        !!placeSearchData?.data?.myLocationExistence ||
        !!placeSearchData?.data?.friendLocationExistence,
    });

  const coordinates = useCoordinates(
    recommendPlaceSearchData,
    midpointSearchData,
    selectedPlace,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePlaceStandardChange = (standard: PLACE_STANDARDS_TYPE) => {
    setSelectedPlaceStandard(standard);
    setCurrentPage(0);
  };

  // 장소 타입 또는 페이지 변경 시 추천 장소 목록 다시 불러오기
  useEffect(() => {
    refetch();
  }, [selectedPlaceStandard, currentPage, refetch]);

  // 추천 장소 목록이 있을 때 첫 번째 장소를 선택
  useEffect(() => {
    if (recommendPlaceSearchData?.data.content.length > 0) {
      setSelectedPlace(recommendPlaceSearchData.data.content[0].name);
    }
  }, [
    recommendPlaceSearchData?.data.content,
    currentPage,
    selectedPlaceStandard,
  ]);

  // url에 쿼리로 있는 위도, 경도에 대해 해당 값이 중간점 검색 데이터에 존재하는지 유효성 확인
  useEffect(() => {
    if (!urlLat || !urlLng || !searchParams.get('location')) {
      navigate(PATH.LOCATION_RESULT(roomId!));
    }

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

  if (
    !isPlaceSearchLoading &&
    !placeSearchData?.data?.myLocationExistence &&
    !placeSearchData?.data?.friendLocationExistence
  ) {
    return <LocationEnterErrorPage />;
  }

  return (
    <>
      <div className="hidden lg:block">
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 px-4 lg:px-[7.5rem] gap-[0.9375rem] mt-[1.375rem]">
          <h3 className="flex items-center text-[1.25rem] font-semibold text-blue-dark01 ml-2">
            {searchParams.get('location')}
          </h3>
          <PlaceTypeFilter
            selectedType={selectedPlaceStandard}
            onTypeChange={handlePlaceStandardChange}
          />
        </div>
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 px-4 lg:px-[7.5rem] gap-[0.9375rem] mt-[0.4375rem]">
          <div className="rounded-default h-[31.25rem] lg:h-[calc(100vh-10rem)]">
            <KakaoMap coordinates={coordinates} />
          </div>
          <PlaceList
            recommendPlaces={recommendPlaceSearchData?.data.content || []}
            selectedPlace={selectedPlace}
            currentPage={currentPage}
            totalPages={recommendPlaceSearchData?.data.totalPages || 0}
            onPlaceSelect={setSelectedPlace}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <div className="lg:hidden">
        <div className="fixed inset-0 top-[4.75rem]">
          <KakaoMap coordinates={coordinates} />
        </div>
        <BottomSheet minHeight={10} maxHeight={72} initialHeight={50}>
          <div className="flex flex-col h-full">
            <div className="sticky top-0 px-4">
              <h3 className="text-[1.125rem] font-semibold text-blue-dark01 mb-3">
                {searchParams.get('location')}에서부터
              </h3>
              <PlaceTypeFilter
                selectedType={selectedPlaceStandard}
                onTypeChange={handlePlaceStandardChange}
              />
            </div>
            <div className="flex-1 px-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full">
              <div className="mt-4">
                {recommendPlaceSearchData?.data.content.map(
                  (place: IPlaceContent) => (
                    <div
                      key={place.name}
                      className={`p-4 rounded-lg mb-3 cursor-pointer ${
                        selectedPlace === place.name
                          ? 'bg-blue-100 opacity-95 ring-2 ring-blue-normal01'
                          : 'ring-1 ring-primary'
                      }`}
                      onClick={() => setSelectedPlace(place.name)}
                    >
                      <div className="flex items-start justify-between mb-[0.125rem]">
                        <h3 className="font-semibold text-blue-dark01 text-content">
                          {place.name}
                        </h3>
                        <span className="text-description text-gray-dark">
                          {place.distance}m
                        </span>
                      </div>
                      <p className="text-description text-gray-dark">
                        {place.roadNameAddress}
                      </p>
                    </div>
                  ),
                )}
              </div>
              <div className="flex items-center justify-center gap-3 py-4">
                <div className="w-[2.5rem]">
                  {currentPage > 0 && (
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="p-2"
                    >
                      <IconLeftArrow />
                    </button>
                  )}
                </div>
                <span className="text-description">
                  {currentPage + 1} /{' '}
                  {recommendPlaceSearchData?.data.totalPages || 1}
                </span>
                <div className="w-[2.5rem]">
                  {currentPage <
                    (recommendPlaceSearchData?.data.totalPages || 1) - 1 && (
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="p-2"
                    >
                      <IconRightArrow />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </BottomSheet>
      </div>
    </>
  );
}
