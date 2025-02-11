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

  const { data: midpointSearchData } = useMidpointSearchQuery();
  const { data: recommendPlaceSearchData, refetch } =
    useGetRecommendPlaceSearchQuery(selectedPlaceStandard, currentPage);

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

  return (
    <>
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 px-4 lg:px-[7.5rem] gap-[0.9375rem] mt-[1.375rem]">
        <h3 className=" hidden lg:flex items-center text-[1.25rem] font-semibold text-blue-dark01 ml-2">
          {searchParams.get('location')}
        </h3>
        <PlaceTypeFilter
          selectedType={selectedPlaceStandard}
          onTypeChange={handlePlaceStandardChange}
        />
      </div>
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 px-4 lg:px-[7.5rem] gap-[0.9375rem] mt-[0.4375rem]">
        <div className="rounded-default h-[31.25rem] lg:h-[43.75rem]">
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
    </>
  );
}
