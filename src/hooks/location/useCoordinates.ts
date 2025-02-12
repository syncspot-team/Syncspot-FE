import { useMemo } from 'react';
import { IMidpointDataResponseType } from '@src/types/location/midpointSearchResponseType';
import { IPlaceSearchResponseType } from '@src/types/location/placeSearchResponseType';
import { IMidpointSearchResponseType } from '@src/types/location/midpointSearchResponseType';
import { ICoordinate } from '@src/components/common/kakao/KakaoMap';
import { IRecommendPlaceSearchResponseType } from '@src/types/location/recommendPlaceSearchResponseType';
import { useSearchParams } from 'react-router-dom';

type PlaceDataType =
  | IPlaceSearchResponseType
  | IRecommendPlaceSearchResponseType;

export function useCoordinates(
  placeSearchData: PlaceDataType,
  midpointSearchData: IMidpointSearchResponseType,
  selectedLocation: number | string | null,
) {
  const [searchParams] = useSearchParams();
  const urlLat = Number(searchParams.get('lat'));
  const urlLng = Number(searchParams.get('lng'));

  return useMemo<ICoordinate[]>(() => {
    if (!placeSearchData?.data || !midpointSearchData?.data) return [];

    // 추천 장소 검색 데이터인 경우
    if ('content' in placeSearchData.data) {
      const recommendCoords = placeSearchData.data.content.map((place) => ({
        lat: place.addressLat,
        lng: place.addressLong,
        isMyLocation: false,
        roadNameAddress: place.name,
        isSelected: place.name === selectedLocation,
      }));

      const midpointCoord = midpointSearchData.data
        .filter(
          (point: IMidpointDataResponseType) =>
            point.addressLat === urlLat && point.addressLong === urlLng,
        )
        .map((point: IMidpointDataResponseType) => ({
          lat: point.addressLat,
          lng: point.addressLong,
          isMyLocation: true,
          roadNameAddress: point.name,
        }));

      return [...recommendCoords, ...midpointCoord];
    } else {
      // 내 위치와 친구 위치 처리
      const myLocations = placeSearchData.data.myLocationExistence
        ? placeSearchData.data.myLocations.map((location) => ({
            lat: location.addressLat,
            lng: location.addressLong,
            isMyLocation: false,
            roadNameAddress: location.roadNameAddress,
          }))
        : [];

      const friendLocations = placeSearchData.data.friendLocationExistence
        ? placeSearchData.data.friendLocations.map((location) => ({
            lat: location.addressLat,
            lng: location.addressLong,
            isMyLocation: false,
            roadNameAddress: location.roadNameAddress,
          }))
        : [];

      // 중간 지점 위치 처리 (선택된 위치만 표시)
      const midpointLocations = midpointSearchData.data
        .filter((_, index) => index === selectedLocation)
        .map((location: IMidpointDataResponseType) => ({
          lat: location.addressLat,
          lng: location.addressLong,
          isMyLocation: true,
          roadNameAddress: location.name || '위치 정보 없음',
          isSelected: true,
        }));

      return [...myLocations, ...friendLocations, ...midpointLocations];
    }
  }, [selectedLocation, placeSearchData, midpointSearchData, urlLat, urlLng]);
}
