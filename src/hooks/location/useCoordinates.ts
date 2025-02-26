import { IMidpointDataResponseType } from '@src/types/location/midpointSearchResponseType';
import { IPlaceSearchResponseType } from '@src/types/location/placeSearchResponseType';
import { IMidpointSearchResponseType } from '@src/types/location/midpointSearchResponseType';
import { IRecommendPlaceSearchResponseType } from '@src/types/location/recommendPlaceSearchResponseType';
import { useSearchParams } from 'react-router-dom';
import { IMidpointTimeSearchResponseType } from '@src/types/location/midpointTimeSearchResponseType';

type PlaceDataType =
  | IPlaceSearchResponseType
  | IRecommendPlaceSearchResponseType;

export function useCoordinates(
  placeSearchData: PlaceDataType,
  midpointSearchData: IMidpointSearchResponseType,
  selectedLocation: number | string | null,
  timeSearchData?: IMidpointTimeSearchResponseType,
) {
  const [searchParams] = useSearchParams();
  const urlLat = Number(searchParams.get('lat'));
  const urlLng = Number(searchParams.get('lng'));

  if (!placeSearchData?.data || !midpointSearchData?.data) return [];

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
  }

  // 내 위치와 친구 위치 처리
  const myLocations = placeSearchData.data.myLocationExistence
    ? placeSearchData.data.myLocations.map((location, index) => ({
        lat: location.addressLat,
        lng: location.addressLong,
        isMyLocation: false,
        roadNameAddress: location.roadNameAddress,
        duration: timeSearchData?.data?.elements[index]?.duration?.text,
        distance: timeSearchData?.data?.elements[index]?.distance?.text,
      }))
    : [];

  const friendLocations = placeSearchData.data.friendLocationExistence
    ? placeSearchData.data.friendLocations.map((location, index) => ({
        lat: location.addressLat,
        lng: location.addressLong,
        isMyLocation: false,
        roadNameAddress: location.roadNameAddress,
        duration:
          timeSearchData?.data?.elements[myLocations.length + index]?.duration
            ?.text,
        distance:
          timeSearchData?.data?.elements[myLocations.length + index]?.distance
            ?.text,
      }))
    : [];

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
