import { useMemo } from 'react';
import { IMidpointDataResponseType } from '@src/types/location/midpointSearchResponseType';
import { IPlaceSearchResponseType } from '@src/types/location/placeSearchResponseType';
import { IMidpointSearchResponseType } from '@src/types/location/midpointSearchResponseType';
import { ICoordinate } from '@src/components/common/kakao/KakaoMap';

export function useCoordinates(
  placeSearchData: IPlaceSearchResponseType,
  midpointSearchData: IMidpointSearchResponseType,
  selectedLocationIndex: number,
) {
  return useMemo<ICoordinate[]>(() => {
    if (!placeSearchData?.data || !midpointSearchData?.data) return [];

    const myLocations = placeSearchData.data.myLocationExistence
      ? [
          {
            lat: placeSearchData.data.myLocations[0].addressLat,
            lng: placeSearchData.data.myLocations[0].addressLong,
            isMyLocation: true,
            roadNameAddress:
              placeSearchData.data.myLocations[0].roadNameAddress,
          },
        ]
      : [];

    const midpointLocations = midpointSearchData.data.map(
      (location: IMidpointDataResponseType, index: number) => ({
        lat: location.addressLat,
        lng: location.addressLong,
        isMyLocation: false,
        roadNameAddress: location.name || '위치 정보 없음',
        isSelected: index === selectedLocationIndex,
      }),
    );

    return [...myLocations, ...midpointLocations];
  }, [selectedLocationIndex, placeSearchData, midpointSearchData]);
}
