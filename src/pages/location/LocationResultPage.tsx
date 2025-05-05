import { useState, useEffect, useCallback } from 'react';
import KakaoMap from '@src/components/common/kakao/KakaoMap';
import { useMidpointSearchQuery } from '@src/state/queries/location/useMidpointSearchQuery';
import { useGetPlaceSearchQuery } from '@src/state/queries/location/useGetPlaceSearchQuery';
import { IMidpointDataResponseType } from '@src/types/location/midpointSearchResponseType';
import { useMidpointTimeSearchQuery } from '@src/state/queries/location/useMidpointTimeSearchQuery';
import MidpointListItem from '@src/components/location/MidpointListItem';
import { useCoordinates } from '@src/hooks/location/useCoordinates';
import { SEQUENCE } from '@src/components/location/constants';
import SearchLocationLoading from '@src/components/loading/SearchLocationLoading';
import LocationEnterErrorPage from '@src/components/location/LocationEnterErrorPage';
import LocationResultSkeleton from '@src/components/skeleton/LocationResultSkeleton';

export default function LocationResultPage() {
  // 앱 최초 로드 여부를 세션 스토리지에 저장하여 확인
  const [isInitialAppLoad, setIsInitialAppLoad] = useState(() => {
    return sessionStorage.getItem('hasLoadedMidpointResult') !== 'true';
  });
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  // 중간지점 변경 중일 때는 로딩 인디케이터를 표시하지 않음
  const [isChangingLocation, setIsChangingLocation] = useState(false);

  const { data: placeSearchData, isLoading: isPlaceSearchLoading } =
    useGetPlaceSearchQuery();
  const {
    data: midpointSearchData,
    isLoading: isMidpointSearchLoading,
    isFetching: isMidpointFetching,
  } = useMidpointSearchQuery({
    enabled:
      placeSearchData?.data?.myLocationExistence ||
      placeSearchData?.data?.friendLocationExistence,
  });

  const selectedMidpoint = midpointSearchData?.data[selectedLocationIndex];
  const {
    data: timeSearchData,
    isFetching: isTimeFetching,
    refetch: refetchMidpointTimeSearch,
  } = useMidpointTimeSearchQuery(
    selectedMidpoint?.addressLat || 0,
    selectedMidpoint?.addressLong || 0,
    {
      enabled:
        !!midpointSearchData?.data &&
        !!selectedMidpoint &&
        selectedMidpoint.addressLat !== 0 &&
        selectedMidpoint.addressLong !== 0,
    },
  );

  // 중간지점 선택 핸들러 - 시간 정보는 백그라운드에서 조용히 불러옴
  const handleLocationSelect = useCallback((index: number) => {
    setIsChangingLocation(true);
    setSelectedLocationIndex(index);
    // 위치가 변경되면 이전 데이터를 계속 사용하면서 새 데이터를 백그라운드에서 로드
  }, []);

  // 중간지점이 변경되면 시간 정보 다시 가져오기
  useEffect(() => {
    if (selectedMidpoint?.addressLat && selectedMidpoint?.addressLong) {
      refetchMidpointTimeSearch().finally(() => {
        // 데이터 로딩이 완료되면 위치 변경 상태 해제
        setIsChangingLocation(false);
      });
    }
  }, [selectedMidpoint, refetchMidpointTimeSearch]);

  // 최초 앱 로드 시에만 로딩 화면 표시, 데이터 로드 완료 후 세션 스토리지에 표시 완료 저장
  useEffect(() => {
    if (
      isInitialAppLoad &&
      !isPlaceSearchLoading &&
      !isMidpointSearchLoading &&
      midpointSearchData
    ) {
      // 최초 로딩이 완료되면 세션 스토리지에 저장
      const timer = setTimeout(() => {
        sessionStorage.setItem('hasLoadedMidpointResult', 'true');
        setIsInitialAppLoad(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [
    isInitialAppLoad,
    isPlaceSearchLoading,
    isMidpointSearchLoading,
    midpointSearchData,
  ]);

  const coordinates = useCoordinates(
    placeSearchData,
    midpointSearchData,
    selectedLocationIndex,
    timeSearchData,
  );

  // 최초 앱 로드 시에는 로딩 화면 표시
  if (isInitialAppLoad) {
    return <SearchLocationLoading />;
  }

  // 초기 데이터 로딩 중일 때만 스켈레톤 UI 표시
  if (
    isPlaceSearchLoading ||
    !placeSearchData ||
    (isMidpointSearchLoading && !midpointSearchData)
  ) {
    return <LocationResultSkeleton />;
  }

  // 장소 정보가 없는 경우 에러 페이지 표시
  if (
    !placeSearchData?.data?.myLocationExistence &&
    !placeSearchData?.data?.friendLocationExistence
  ) {
    return <LocationEnterErrorPage />;
  }

  // 데이터 새로고침 중인지 여부를 확인 (필터 변경이나 페이지 전환 시)
  // 중간지점 변경 중에는 로딩 인디케이터를 표시하지 않음
  const isRefreshing =
    !isChangingLocation &&
    ((isMidpointFetching && midpointSearchData) ||
      (isTimeFetching && timeSearchData));

  return (
    <>
      <div className="hidden lg:grid w-full grid-cols-1 lg:grid-cols-10 px-4 lg:px-[7.5rem] gap-[1.25rem] lg:gap-[0.625rem] mt-[1.5625rem]">
        <div className="rounded-default h-[31.25rem] lg:min-h-[calc(100vh-8rem)] lg:col-span-6 relative">
          {isRefreshing && (
            <div className="absolute z-10 top-2 right-2">
              <div className="w-6 h-6 rounded-full border-3 border-blue-light01 border-t-blue-normal01 animate-spin"></div>
            </div>
          )}
          <KakaoMap coordinates={coordinates} />
        </div>
        <div className="lg:col-span-4 lg:max-h-[calc(100vh-8rem)] relative">
          {isRefreshing && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50">
              <div className="w-8 h-8 border-4 rounded-full border-blue-light01 border-t-blue-normal01 animate-spin"></div>
            </div>
          )}
          <ul className="grid grid-cols-1 grid-rows-5 h-full gap-[0.625rem]">
            {midpointSearchData.data.map(
              (location: IMidpointDataResponseType, index: number) => (
                <MidpointListItem
                  key={index}
                  location={location}
                  index={index}
                  isSelected={selectedLocationIndex === index}
                  sequence={SEQUENCE[index]}
                  onSelect={() => handleLocationSelect(index)}
                />
              ),
            )}
          </ul>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="fixed inset-0 top-[4.75rem]">
          {isRefreshing && (
            <div className="absolute z-10 top-2 right-2">
              <div className="w-6 h-6 rounded-full border-3 border-blue-light01 border-t-blue-normal01 animate-spin"></div>
            </div>
          )}
          <KakaoMap coordinates={coordinates} />
        </div>
        <div className="fixed bottom-0 left-0 right-0">
          <div className="relative w-full pb-6">
            <div className="relative flex gap-2 p-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              {isRefreshing && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50">
                  <div className="w-8 h-8 border-4 rounded-full border-blue-light01 border-t-blue-normal01 animate-spin"></div>
                </div>
              )}
              {midpointSearchData.data.map(
                (location: IMidpointDataResponseType, index: number) => (
                  <div
                    key={index}
                    className="snap-center shrink-0 first:pl-0 last:pr-4 w-[calc(100dvw-5rem)]"
                  >
                    <div className="bg-white-default">
                      <MidpointListItem
                        location={location}
                        index={index}
                        isSelected={selectedLocationIndex === index}
                        sequence={SEQUENCE[index]}
                        onSelect={() => handleLocationSelect(index)}
                      />
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
