import { useState, useEffect } from 'react';
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

export default function LocationResultPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);

  const { data: placeSearchData, isLoading: isPlaceSearchLoading } =
    useGetPlaceSearchQuery();
  const { data: midpointSearchData } = useMidpointSearchQuery({
    enabled:
      placeSearchData?.data?.myLocationExistence ||
      placeSearchData?.data?.friendLocationExistence,
  });

  const selectedMidpoint = midpointSearchData?.data[selectedLocationIndex];
  const { data: timeSearchData, refetch: refetchMidpointTimeSearch } =
    useMidpointTimeSearchQuery(
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

  useEffect(() => {
    if (selectedMidpoint?.addressLat && selectedMidpoint?.addressLong) {
      refetchMidpointTimeSearch();
    }
  }, [selectedMidpoint, refetchMidpointTimeSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const coordinates = useCoordinates(
    placeSearchData,
    midpointSearchData,
    selectedLocationIndex,
    timeSearchData,
  );

  if (isLoading) return <SearchLocationLoading />;
  if (
    !isPlaceSearchLoading &&
    !placeSearchData?.data?.myLocationExistence &&
    !placeSearchData?.data?.friendLocationExistence
  )
    return <LocationEnterErrorPage />;
  if (!midpointSearchData) return <LocationEnterErrorPage />;

  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-10 px-4 lg:px-[7.5rem] gap-[1.25rem] lg:gap-[0.625rem] mt-[1.5625rem]">
      <div className="rounded-default h-[31.25rem] lg:min-h-[calc(100vh-8rem)] lg:col-span-6">
        <KakaoMap coordinates={coordinates} />
      </div>
      <div className="lg:col-span-4 lg:max-h-[calc(100vh-8rem)]">
        <ul className="grid grid-cols-1 grid-rows-5 h-full gap-[0.625rem]">
          {midpointSearchData.data.map(
            (location: IMidpointDataResponseType, index: number) => (
              <MidpointListItem
                key={index}
                location={location}
                index={index}
                isSelected={selectedLocationIndex === index}
                sequence={SEQUENCE[index]}
                onSelect={() => setSelectedLocationIndex(index)}
              />
            ),
          )}
        </ul>
      </div>
    </div>
  );
}
